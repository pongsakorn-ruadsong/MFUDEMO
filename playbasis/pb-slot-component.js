/**
 * Created by admin on 7/20/2018 AD.
 */

const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 250;
var rewards = [];
var seed;

function createSlots(ring) {
    getReward();
    var slotAngle = 360 / SLOTS_PER_REEL;
    var seed = 0;
    for (var i = 0; i < SLOTS_PER_REEL; i++) {
        var colors = ['#eae869','#ffc700','#ff9d00','#ff6100','#ff0000','#ff006e','#e500ff','#7b00ff','#007bff','#00ffa9','#00ff19','#bff442'];

        var slot = document.createElement("div");
        slot.className = "slot";

        var bg = document.createElement("div");
        bg.className = "bg2";

        var pic = document.createElement("div");
        pic.className = "pic";

        var transform = "rotateX(" + slotAngle * i + "deg) translateZ(" + REEL_RADIUS + "px)";

        slot.style.transform = transform;

        if(rewards[i].reward_name == "goods") {
            pic.setAttribute("style", "background-image:url("+ rewards[i].data.image +");");
            bg.setAttribute("style", "background:"+ colors[i] +";");
        }else if(rewards[i].reward_name == "point") {
            $(pic).append("<span>Point " + rewards[i].quantity + "</span>");
            bg.setAttribute("style", "background:"+ colors[i] +";");
        }else if(rewards[i].reward_name == "exp") {
            var h = "img/EXP.png";
            pic.setAttribute("style", "background-image: url(" + h + ");")
            bg.setAttribute("style", "background:"+ colors[i] +";");
        }else {
            var h = "img/coin_22.png";
            pic.setAttribute("style", "background-image: url(" + h + ");")
            bg.setAttribute("style", "background:"+ colors[i] +";");
        }

        ring.append(slot);
        slot.append(bg);
        bg.append(pic);
    }
}

function getReward() {
    $.ajax({
        type: "GET",
        async: false,
        url: "https://api.pbapp.net/Engine/rules?action=click&api_key=" + sessionStorage['api_key'] + "&iodocs=true",
        datatype: "json",
        success: function(data){
            for(var i=0;i<SLOTS_PER_REEL;i++) {
                rewards[i] = data.response[0].jigsaw_set[2].config.group_container[i];
            }
        }
    });
    for(var i=0;i<10+Math.floor(Math.random() * 10);i++){
        var a = Math.floor(Math.random() * rewards.length);
        var b = Math.floor(Math.random() * rewards.length);

        var temp = rewards[a];
        rewards[a] = rewards[b];
        rewards[b] = temp;
    }
    console.log(rewards);
}

function getSeed() {
    var data = new Object();
    data.token = sessionStorage['Token'];
    data.action = "click";
    data.player_id = sessionStorage['player'];
    data.url = "test";
    $.ajax({
        type: "POST",
        url: "https://api.pbapp.net/Engine/rule?api_key=" + sessionStorage['api_key'] + "&iodocs=true",
        data: data,
        datatype: "json",
        async: false,
        success: function(d){
            var rewards_target;
            seed = null;
            for(var i=0;i<d.response.events.length;i++){
                if(d.response.events[i].event_type == "REWARD_RECEIVED") {
                    rewards_target = d.response.events[i];
                    console.log(rewards_target);
                }
            }
            for(var i=0;i<rewards.length;i++){
                if(rewards_target.reward_type == "goods") {
                    if(rewards_target.reward_data.goods_id == rewards[i].item_id){
                        seed = i;
                    }
                }else if(rewards_target.reward_type == rewards[i].reward_name && rewards_target.value == rewards[i].quantity) {
                    seed = i;
                }else if(rewards_target.reward_type == rewards[i].reward_name && rewards_target.value == rewards[i].quantity) {
                    seed = i;
                }
            }
        }
    });
}

function spin(timer) {
    for (var i = 1; i < 2; i++) {
        var oldSeed = -1;
        var oldClass = $("#ring" + i).attr("class");
        if (oldClass.length > 4) {
            oldSeed = parseInt(oldClass.slice(10));
        }

        getSeed();
        console.log("-----");
        console.log("seed: " + seed);
        console.log("-----");
        while(seed+8 == oldSeed || seed-4 == oldSeed){
            getSeed();
            console.log("-----");
            console.log("seed: " + seed);
            console.log("-----");
        }

        if(seed+8>12) {
            $("#ring" + i)
                .css(
                    "animation",
                    "back-spin 1s, spin-" + (seed-4) + " " + (timer) + "s"
                )
                .attr("class", "ring spin-" + (seed-4));
        }else {
            $("#ring" + i)
                .css(
                    "animation",
                    "back-spin 1s, spin-" + (seed+8) + " " + (timer) + "s"
                )
                .attr("class", "ring spin-" + (seed+8));
        }
    }
}