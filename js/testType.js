var userData = [];

function buildDate(){

  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

    for(var i=0;i<months.length;i++){
      $(".months").append('<option value="'+months[i]+'">'+months[i]+'</option>');
    }
    for (var i=1; i<=31;i++){
      $(".days").append('<option value="'+i+'">'+i+'</option>')
    }
  var d = new Date();
  var n = d.getFullYear();
    for (var i=1950; i<=n;i++){
      $(".years").append('<option value="'+i+'">'+i+'</option>')
    }
}


// function buildProvince(){
//     var region=['Northern','Western','Central','Southern','Northeastern'];
//     for(var i=0;i<region.length;i++){
//       $(".months").append('<option value="'+region[i]+'">'+region[i]+'</option>');
//     }
//     for (var i=1; i<=31;i++){
//       $(".days").append('<option value="'+i+'">'+i+'</option>')
//     }
//   var d = new Date();
//   var n = d.getFullYear();
//     for (var i=1950; i<=n;i++){
//       $(".years").append('<option value="'+i+'">'+i+'</option>')
//     }
// }

function getUserdate() {
    $.ajax({
          type: "GET",
            url: 'https://api.pbapp.net/Player/'+sessionStorage['player']+'/data/all?api_key='+sessionStorage['api_key'],
            dataType: "json",
              success: function(data){
                userData = data;
                buildUserProfile();
                initialSwipes_currency();
              },
        error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
  }

function buildUserProfile(){
  console.log('Enter')
  // var length = userData.response.goods_list.length;
  var data = userData.response.player;
      var point = '';
      var expId = data.exp;
      var percentExp = data.percent_of_level;

    for(var i = 0; i<data.points.length;i++){
      if (data.points[i].reward_name == "point") {
        point = data.points[i].value;
      }
    }
  $('#userPrice').text(point +' points');
  $('#userPrice1').text(point +' points');
  fillWater(percentExp);
}

function fillWater(exp){
  console.log(exp)
  var elem = document.getElementById("water");
  var elem1 = document.getElementById("displayPercent");   
  var elem2 = document.getElementById("water-block");
  var height = $('#water-block').css('margin-top');
  var percent = exp;
  // elem.style.height =  '100%';
  console.log(percent)
  console.log(height)
    for (var i = 0; i < 5; i++) {
      var full = 50-i;
     $(elem2).css('margin-top',full+'%');
      // elem1.innerHTML = exp + '%';
    }
  
}

function initialSwipes_currency(){
      var swiper = new Swiper('.swiperCircle1', {
      slidesPerView: 1,
      spaceBetween: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}

function graph(){
    var chart = new Chartist.Line('.ct-chart', {
    labels: [1, 2, 3, 4, 5],
    series: [
      [1, 2, 2, 4, 5],
    ]
  }, {
    low: 0,
    showArea: true,
    showPoint: false,
    width: 225,
    height: 150,
      axisX: {
        showLabel: false,
        offset: 0,
        showGrid: false,
      },
      axisY: {
        showLabel: false,
        showGrid: false,
        offset: 5
      },
  });
    var seq = 0,
  delays = 80,
  durations = 500;

chart.on('created', function() {
  seq = 0;
});

chart.on('draw', function(data) {
  seq++;

  if(data.type === 'line') {
    data.element.animate({
     x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
     opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
    var pos1Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '1'] - 30,
      to: data[data.axis.units.pos + '1'],
      easing: 'easeOutQuart'
    };

    var pos2Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '2'] - 100,
      to: data[data.axis.units.pos + '2'],
      easing: 'easeOutQuart'
    };

    var animations = {};
    animations[data.axis.units.pos + '1'] = pos1Animation;
    animations[data.axis.units.pos + '2'] = pos2Animation;
    animations['opacity'] = {
      begin: seq * delays,
      dur: durations,
      from: 0,
      to: 1,
      easing: 'easeOutQuart'
    };

    data.element.animate(animations);
  }
});
}