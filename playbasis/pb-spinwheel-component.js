// Test component only, when you clone basepolymerit repository, you are free to use this code as
// a starting point of develop your own component. But you're free to remove it.
//

'use strict';

// selected playbasis.js for testing purpose
let Playbasis = require('playbasis.js');

class PbSpinwheel {

  beforeRegister() {
    // Takes camelcase class name "PbSpinwheel" -> "stock-ticker".
    let is = this.constructor.name.replace(/\W+/g, '-')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();

    this.is = is;
    this.properties = {
        // error code used for this component
        kErrorCode: {
          type: Object,
          readOnly: true,
          value: function() {
            return {
              PLAYBASIS_NOT_BUILD: 1,       // playbasis environment was not built yet
              NO_APPLICABLE_RULE: 2,        // no applicable rule can be found to use with spin wheel
              PLAYER_ID_NOT_SET: 3,         // player id is not set prior to attaching component HTML element in the DOM
            }
          }
        },
        // aimed to be constant variable for success event name
        // user adds event listener to this name to listen to it
        kSuccessEvent: {
          type: String,
          readOnly: true,
          value: function() { return "pb-spinwheel-success-event"; }
        },
        // aimed to be constant variable for error event name
        // user adds event listener to this name to listen to it
        kErrorEvent: {
          type: String,
          readOnly: true,
          value: function() { return "pb-spinwheel-error-event"; }
        },
        // dynamically set internally when it's firstly loaded successfully
        isLoaded: {
          type: Boolean,
          value: function() { return false; }
        },
        // turn this on to true to also show debugging log to console
        showDebugLog: {
          type: Boolean,
          value: function() { return false; }
        },

        // required settings
        playerId: {
          type: String,
          value: function() { return null; }
        },

        // enviroment settings
        envPointRewardLevels: {
          type: Object,
          value: function() { 
            return {
              level2: 10,
              level3: 30,
              level4: 60
            }
          }
        },
        envTargetAction: {
          type: String,
          value: function() { return "click"; }
        },
        envTargetTag: {
          type: String,
          value: function() { return "spin-wheel"; }
        },
        envCustomParamUrlValues: {
          type: Array,
          value: function() { return ["spin-wheel1", "spin-wheel2", "spin-wheel3"] }
        }
    };

    this.attached = function() {

      // get child element id
      this._innerWheelHtmlElement = document.getElementById("inner-wheel");

      if (Playbasis.env.global.apiKey != null &&
          Playbasis.env.global.apiSecret != null) {
        // initialize by load
        this.loadSpinWheelRules();
      }
      else {
        let e = new Error("Playbasis environment is not built yet");
        e.code = this.kErrorCode.PLAYBASIS_NOT_BUILD;
        this.fireErrorEvent(e);
      }
    }

    // hide private member variables inside here
    // actually can do it as well inside this.properties with readOnly set to true
    this.ready = function() {
      this._degree = 1800;

      // pre-defined odd number with special inclusive on 0 at first element
      // used in spin wheel algorithm
      // support rendering spin wheel from 6-8 sections
      this._kOdds = [0, 1, 3, 5, 7, 9, 11, 13, 15];   
      this._rewards = [];
      this._gotRewardItem = null;   // reward that will be got from executing rule
      this._targetSelectionIndex;   // section index that spin wheel will be spinning, corresponding to gotRewardItem from executing rule
      this._spinButtonDisabled = true;    // expose disability of button to outside

      this._kParamName = "url";
      this._innerWheelHtmlElement;
    }
  }

  /**
   * Debug log wrapper for this.dlog().
   * This function will ignore and not do anything if this.showDebugLog is not set.
   * @param  {String} msg message
   * @param  {Object} obj object that need to be printed. It will be printed using this.dlog(msg, obj)
   */
  dlog(msg, obj) {
    if (this.showDebugLog) {
      obj != null ? console.log(msg, obj) : console.log(msg);
    }
  }

  /**
   * Fire success event with attached data
   * @param  {Object} dataObj data to be sent along with success event
   */
  fireSuccessEvent(dataObj) {
    this.dlog("firing success event: " + this.kSuccessEvent, dataObj);

    var event = new CustomEvent( this.kSuccessEvent, { "detail": dataObj } );
    document.dispatchEvent(event);
  }

  /**
   * Fire error event with attached data
   * @param  {Object} dataObj data to be sent along with error event
   */
  fireErrorEvent(dataObj) {
    this.dlog("firing error event: " + this.kErrorEvent, dataObj);
    var event = new CustomEvent( this.kErrorEvent, { "detail": dataObj } );
    document.dispatchEvent(event);
  }

  /**
   * Begin loading rules for spinwheel
   */
  loadSpinWheelRules() {

    let selfObj = this;

    Playbasis.engineApi.listRules({action: this.envTargetAction})
      .then((result) => {

        selfObj.dlog("result: ", result);

        // find possible rules
        var rules = selfObj.findRulesWithTargetTagAndHaveCustomUrlValuesThatPassedUrlValuesCriteria(result.response, selfObj.envCustomParamUrlValues);
        // get a random rule to play with
        selfObj._rule = selfObj.getRandomRuleToPlay(rules);

        selfObj.dlog("got rule: ", selfObj._rule);

        if (selfObj._rule == null) {
          selfObj.dlog("there's no rule to play with");

          // do nothing as css already showed the initial state of spinwheel
          // fire error event to let users knows
          let e = new Error("There is no applicable rule for spinwheel.");
          e.code = selfObj.kErrorCode.NO_APPLICABLE_RULE;
          selfObj.fireErrorEvent(e);
        }
        else {
          selfObj.dlog("got rule to play with");

          // find all rewards from rule
          selfObj.findAllRewardsFromRuleThenSave(selfObj._rule);
          // shuffle rewards
          selfObj.shuffleRewards();

          selfObj.dlog("shuffle");
          selfObj.dlog(selfObj._rewards);

          // generate reward DOM
          selfObj.generateAndAddRewardHTMLElement_to_spinWheelSection();

          // allow user to spin
          selfObj._spinButtonDisabled = false;

          // set that it successfully loaded
          // this will mark that spin wheel is successfully loaded and will render
          // each sections on the wheel necessarily
          selfObj.isLoaded = true;
        }
      }, (e) => {
        selfObj.dlog("error fetching all rules. " + e.code + ", " + e.message);

        selfObj.fireErrorEvent(e);
      });
  }

  /**
   * Begin spinwhel flow
   */
  beginSpinWheelFlow() {
    this.dlog("_spinButtonDisabled: " + this._spinButtonDisabled);

    if (!this._spinButtonDisabled) {
      this._spinButtonDisabled = true;

      this.executeEngineRuleToGetRewardId()
        .then((result) => {
          // save got-reward
          // support only 1 reward from reward group set in dashboard
          this._gotRewardItem = result.response.events[0];

          // mark target section index
          this.markTargetSectionIndex();

          // spin the wheel
          this.spinWheel(this.getRotationAngleForTargetSectionIndex(this._targetSectionIndex));
        }, (e) => {
          this.dlog(e);
          this.fireErrorEvent(e);
        });

      this.dlog("clicked to spin");

      // disable button
      document.getElementById("pb-spinwheel-button").disabled = true;
    }
  }

  /**
   * Get rotation angle within a target section index
   * @param  {Number} index section index number
   * @return {Number}       rotation that spin wheel should be rotating to reach the target section index
   */
  getRotationAngleForTargetSectionIndex(index) {
    // section angle
    // this is a disect of total sections that it's easy for this method to spin the wheel
    let halfSectionAngle = 360 / this._rewards.length / 2;

    // min angle (inclusive), and max angle (exclusive) to spin to
    let minAngle;
    let maxAngle;

    this.dlog("kOdds: ", this._kOdds);

    // special case for section index 0
    // its both half section is on both side of spinning direction
    // to go to another half (right half), we need to find correct angle, and we can't use negative angle as general direction of spinning is to the left
    if (index == 0) {
      // random which half spin wheel should go
      let isGoRight = Math.floor(Math.random() * 2) == 0 ? false : true;
      if (isGoRight) {
        minAngle = this._kOdds[this._rewards.length] * halfSectionAngle;
        maxAngle = 360.01;  // at the beginning

        this.dlog("target index at 0: go right");
        this.dlog("minAngle: " + minAngle + ", maxAngle: " + maxAngle);
      }
      else {
        minAngle = 0;
        maxAngle = halfSectionAngle;

        this.dlog("target index at 0: go left");
        this.dlog("minAngle: " + minAngle + ", maxAngle: " + maxAngle);
      }
    }
    else {
      minAngle = this._kOdds[index] * halfSectionAngle;
      maxAngle = this._kOdds[index+1] * halfSectionAngle;

      this.dlog("minAngle: " + minAngle + ", maxAngle: " + maxAngle);
    }

    // return the calcuated angle within the acceptable range
    var retAngle = Math.floor(Math.random() * (maxAngle-minAngle)) + minAngle;
    this.dlog("spin to angle: " + retAngle);
    return retAngle;
  }

  /**
   * Shuffle rewards
   */
  shuffleRewards() {
    this.shuffle(this._rewards);
  }

  /**
   * Shuffle array
   * Thanks to http://jsfromhell.com/array/shuffle
   */
  shuffle(a) {
      let j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
  }

  /**
   * Get reward id from executing engine rule.
   * @return {Object} Promise object
   */
  executeEngineRuleToGetRewardId() {
    let playerId = this.playerId;

    // if player id is not set properly yet, then return Promise's reject object immediately
    if (playerId == null ||
        playerId == "") {
      
      let e = new Error("Player Id is not set prior to attaching " + this.is + " in the DOM. Set it by using 'player-id=<player-id>' as attribute in <pb-spinwheel> HTML element.");
      e.code = this.kErrorCode.PLAYER_ID_NOT_SET;
      
      // return Promise object
      return new Promise( (resolve, reject) => {
        return reject(e);
      });
    }

    let selfObj = this;
    return new Playbasis.Promise( (resolve, reject) => {
      Playbasis.engineApi.rule(selfObj.envTargetAction, playerId, { url: selfObj._rule.urlValue })
        .then((result) => {

          selfObj.dlog("success rule for spin wheel");
          selfObj.dlog(result);

          return resolve(result);
        }, (e) => {
          selfObj.dlog(e);

          return reject(new Playbasis.Promise.OperationalError("failed on engine rule action: " + selfObj.envTargetAction + ", for playerId: " + playerId + ", urlValue: " + selfObj._rule.urlValue));
        });
    });
  }

  /**
   * Mark which section index is the result reward user should get.
   */
  markTargetSectionIndex() {
    // check reward type first
    // if it's goods, then we need to check against goodsId
    // otherwise if it's point-based, then we need to check against "reward_name" and "quantity"
    // in short check via "reward_name", and "value" => "reward_name", and "quantity"
    // note: support only 1 reward from reward group set in dashboard
    var type = -1;
    var rewardType = this._gotRewardItem.reward_type;
    var rewardValToCheckAgainst;

    this.dlog("mark");
    this.dlog(this._gotRewardItem);

    // be aware that the code doesn't support goods group
    // as goods group's id is dynamically generated thus goods id received as reward is different from one checking from rules
    if (rewardType == "point") {
      type = 1;
      rewardValToCheckAgainst = this._gotRewardItem.value;

      this.dlog("mark: point type -> value: " + rewardValToCheckAgainst);
    }
    else if (rewardType == "goods") {
      type = 2;
      rewardValToCheckAgainst = this._gotRewardItem.reward_data.goods_id;

      this.dlog("mark: goods type -> goods_id: " + rewardValToCheckAgainst);
    }
    else if (rewardType == "badge") {
      type = 3;
      rewardValToCheckAgainst = this._gotRewardItem.reward_data.badge_id;

      this.dlog("mark: badge type -> badge_id: " + rewardValToCheckAgainst);
    }
    // otherwise the normal point-based reward
    else {
      type = 4;
      rewardValToCheckAgainst = this._gotRewardItem.value;

      this.dlog("mark: point-based type -> value: " + rewardValToCheckAgainst);
    }

    this.dlog("final");
    this.dlog(this._rewards);

    // find the matching reward in the pool of rewards we got from the rule
    // checking against either value for point-based, or goods_id for goods
    for (var i=0; i<this._rewards.length; i++) {
      var reward = this._rewards[i];
      
      if (type == 1 && reward.reward_name == "point") {
        if (reward.quantity == rewardValToCheckAgainst) {
          this._targetSectionIndex = i;

          this.dlog("found target section index at: " + this._targetSectionIndex);
          break;
        }
      }
      else if (type == 2 && reward.reward_name == "goods") {
        if (reward.data.goods_id == rewardValToCheckAgainst) {
          this._targetSectionIndex = i;

          this.dlog("found target section index at: " + this._targetSectionIndex);
          break;
        }
      }
      else if (type == 3 && reward.reward_name == "badge") {
        if (reward.data.badge_id == rewardValToCheckAgainst) {
          this._targetSectionIndex = i;

          this.dlog("found target section index at: " + this._targetSectionIndex);
          break;
        }
      }
      else if (type == 4) {
        if (reward.quantity == rewardValToCheckAgainst) {
          this._targetSectionIndex = i;

          this.dlog("found target section index at: " + this._targetSectionIndex);
          break;
        }
      }
    }

    if (this._targetSectionIndex == null) {

      this.dlog("_targetSectionIndex is null");
      this.dlog("type = " + type);
    }
    else {
      this.dlog(this._targetSectionIndex);
    }
  }

  /**
   * Get Spinwheel section styled css string
   * @param  {Number} at    section number
   * @param  {String} color color string
   * @param  {Number} total total of section
   * @return {String}       formed string of styled css for specified section
   */
  getSpinWheelSectionCSSString(at, color, total) {
    let degree = 360 - 360 / total * at;
    return "transform: rotate(" + degree + "deg); -webkit-transform: rotate(" + degree + "deg); -moz-transform: rotate(" + degree + "deg); -o-transform: rotate(" + degree + "deg); -ms-transform: rotate(" + degree + "deg); border-color: " + color + " transparent;";
  }

  /**
   * Generate styled HTML elements and add them into spinwheel
   */
  generateAndAddRewardHTMLElement_to_spinWheelSection() {
    let innerWheel = this._innerWheelHtmlElement;

    // loop throgh all rewards and generate new tag
    for (let i=0; i<this._rewards.length; i++) {
      let reward = this._rewards[i];

      // create a new element div, and add 'sec' as class attribute
      let newElem = document.createElement("div");
      newElem.className += "sec " + "sec-" + this._rewards.length + " " + this.is;

      // handle generating color for total odd section
      // we have to introduce 3rd color
      let color;
      if (this._rewards.length % 2 != 0) {
        // 3 color possibles
        if (this._rewards.length == 5) {
          if (i == this._rewards.length - 1) {
            color = "#cccccc";
          }
          else if (i % 2 == 0) {
            color = "#d6d6d6";
          }
          else {
            color = "#bebebe";
          }
        }
        // 2 color possibles
        else if (this._rewards.length == 7) {
          if (i == this._rewards.length - 1) {
            color = "#d6d6d6";
          }
          else if (i % 3 == 0) {
            color = "#cccccc";
          }
          else if (i % 3 == 1) {
            color = "#d6d6d6";
          }
          else if (i % 3 == 2) {
            color = "#bebebe";
          }
        }
      }
      // otherwise switch between two colors
      else {
        if (i % 2 == 0) {
          color = "#d6d6d6";
        }
        else {
          color = "#bebebe";
        }
      }
      newElem.setAttribute("style", this.getSpinWheelSectionCSSString(i, color, this._rewards.length));
      newElem.setAttribute('data-index', i + '');

      // create a child span element
      let spanElem = document.createElement("span");
      spanElem.className += "fa flag-icon " + this.is;

      // if it's goods, or badge then it has image
      if (reward.reward_name == "goods" ||
        reward.reward_name == "badge") {
        spanElem.setAttribute("style", "background-image: url(" + reward.data.image + ");");
      }
      else if (reward.reward_name == "point") {
        // check which point image to show on spin wheel
        let quantity = reward.quantity;
        let kPointLevels = this.envPointRewardLevels;
        let image;
        if (quantity >= kPointLevels.level4) {
          image = "../assets/starpoint_4.png";
        }
        else if (quantity >= kPointLevels.level3) {
          image = "../assets/starpoint_3.png";
        }
        else if (quantity >= kPointLevels.level2) {
          image = "../assets/starpoint_2.png";
        }
        else {
          image = "../assets/starpoint_1.png";
        }

        spanElem.setAttribute("style", "background-image: url(" + image + ");");
      }
      // other wise use level 1 point base
      // TODO: Add more resource here
      else {
        let image = "../assets/starpoint_1.png";
        spanElem.setAttribute("style", "background-image: url(" + image + ");");
      }

      newElem.appendChild(spanElem);

      // add newly created element to DOM
      innerWheel.appendChild(newElem);
    }
  }

  /**
   * Find all rewards from rule then save it internally
   * @param  {Object} rule rule object
   */
  findAllRewardsFromRuleThenSave(rule) {
    // access customized object via .rule to get jigsaw_set
    let jigsawSet = rule.rule.jigsaw_set;

    for (let i=0; i<jigsawSet.length; i++) {
      let jigsaw = jigsawSet[i];

      // find rewards group
      if (jigsaw.category == "GROUP") {
        // save all rewards
        this._rewards = jigsaw.config.group_container;

        this.dlog("save all rewards. Reward count " + this._rewards.length);
      
        break;  
      }
    }
  }

  /**
   * Find rules that pass the criteria we've set
   * @param  {Object} rulesResponse   rules resposne JSON object as returned directly from Playbasis API call
   * @param  {Array} customUrlValues array of custom url values
   * @return {Array}                 array of rules that passed the criteria
   */
  findRulesWithTargetTagAndHaveCustomUrlValuesThatPassedUrlValuesCriteria(rulesResponse, customUrlValues) {
    var rules = [];

    // search for rules that has tag `targetTag`
    // this is to automatic search for all possible rules for executing
    // with spin wheel
    for (var i=0; i<rulesResponse.length; i++) {
      var r = rulesResponse[i];

      // return -1 if not found
      if (r.tags.search(this.envTargetTag) != -1) {
        // only if this rule has url param set
        if (r.jigsaw_set != null) {
          for (var j=0; j<r.jigsaw_set.length; j++) {
            var jigsaw = r.jigsaw_set[j];

            // only condition via customParameter
            if (jigsaw.name == "customParameter" &&
              jigsaw.category == "CONDITION" &&
              jigsaw.config.param_name == this._kParamName &&
              jigsaw.config.param_operation == "=") {

              // if this jigsaw contains custom url value as we set
              // via config service, then we include it in
              for (var k=0; k<customUrlValues.length; k++) {
                if (jigsaw.config.param_value == customUrlValues[k]) {
                  // push to our qualified rule
                  // create a customize object here {rule:, urlValue:}
                  rules.push({rule: r, urlValue: jigsaw.config.param_value });

                  this.dlog("save rule with urlValue: " + jigsaw.config.param_value);

                  // match first matched of urlParamValues is enough
                  continue;
                }
              }
            }
          }
        }
      }
    }

    return rules;
  }

  /**
   * Get random rule to play
   * @param  {Array} rules array of rules
   * @return {Object}       randomized rule object to play
   */
  getRandomRuleToPlay(rules) {
    if (rules == null)
      return null;
    else if (rules.length == 0)
      return null;

    // after all, all good to go
    let rIndex = Math.floor(Math.random() * rules.length);
    return rules[rIndex];
  }

  /**
   * Get the current rotation angle in degrees from specified element
   * @param  {Object} element HTML element, for example it can be gotten via document.getElementById()
   * @return {Number}         current rotation angle of element in degrees
   */
  getCurrentRotation(element) {
    let st = window.getComputedStyle(element, null);
    let tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";
    let angle;

    if (tr != "none") {
      let values = tr.split('(')[1];
      let values2 = values.split(')')[0];
      let values3 = values2.split(',');
      let a = parseFloat(values3[0]);
      let b = parseFloat(values3[1]);

      let radians = Math.atan2(b, a);

      if (radians < 0) {
        radians += (2 * Math.PI);
      }

      angle = Math.round(radians * (180/Math.PI));
    }
    else {
      angle = 0;
    }

    return angle;
  }

  /**
   * Add event listener to transition end event for inner wheel element
   * It will listen to all possible events that can be across different browsers.
   */
  addEventListenerOfTransitionEndToInnerWheelElement() {
    let events = ["transitionend", "webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd"];
    let innerWheelElem = this._innerWheelHtmlElement;

    let selfObj = this;

    for (var i=0; i<events.length; i++) {

      innerWheelElem.addEventListener(events[i], () => {
        selfObj.dlog("spinning wheel completes for event: " + events[i]);
        selfObj.dlog("rotation stopped at " + selfObj.getCurrentRotation(innerWheelElem));

        // we get result of reward
        // send back though callback
        selfObj.dlog("getRewardItem: ", selfObj._gotRewardItem);

        // send final result back to user
        selfObj.fireSuccessEvent(selfObj._gotRewardItem);
      });
    }
  }

  /**
   * Spin the wheel
   * @param  {Number} targetDegree target rotation in degrees to rotate the wheel to
   */
  spinWheel(targetDegree) {
    this.dlog("spinning wheel");

    // generate random number between 1 - 360, then add to the new degree.
    var newDegree = this._degree;
    var totalDegree = newDegree + targetDegree;

    // add listener to its css transition event
    this.addEventListenerOfTransitionEndToInnerWheelElement();
    this._innerWheelHtmlElement.style.transform = "rotate(" + totalDegree + 'deg)';
  }
}

// Register the element using Polymer's constructor.
Polymer(PbSpinwheel);
