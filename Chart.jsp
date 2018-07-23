<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/Chart.min.js"></script>
</head>
<script type="text/javascript">

Chart.defaults.global.responsive = true;
var player_info;
var goods = [];

function getPlayerInfo() {
    var data = new Object;
    data.id = sessionStorage['player'];
    data.token = sessionStorage['Token'];
    $.ajax({
        type: 'POST',
        url: "https://api.pbapp.net/Player/"+sessionStorage['player']+"/data/all?api_key=141073538&iodocs=true",
        datatype: 'json',
        data: data,
        async: false,
        success: function(d){
            player_info = d.response.player;

            console.log(player_info);

            goods[0] = 0,goods[1] = 0,goods[2] = 0,goods[3] = 0,goods[4] = 0;
            for(var i=0;i<player_info.points.length;i++) {
                if(player_info.points[i].reward_name == "dollar_usd") {
                    goods[3] = d.response.player.points[i].value/100;
                }
                if(player_info.points[i].reward_name == "point") {
                    goods[1] = d.response.player.points[i].value/100;
                }
                if(player_info.points[i].reward_name == "baht_thb") {
                    goods[2] = d.response.player.points[i].value/100;
                }
            }
            for(var i=0;i<player_info.goods.length;i++) {
                goods[0] += d.response.player.goods[i].amount;
            }
            goods[4]= d.response.player.level;
        }
    });
}

function createChart() {
    var radarOptions = {
        scaleOverlay : false,
        scaleOverride : true,
        scaleSteps : 3,
        scaleStepWidth : 10,
        scaleStartValue : 0,
        scaleShowLine : true,
        scaleLineColor : "#ccc",
        scaleLineWidth : 1,
        scaleShowLabels : false,
        scaleFontFamily : "Open Sans",
        scaleFontSize : 0,
        scaleFontStyle : "bold",
        scaleFontColor : "#666",
        scaleShowLabelBackdrop : false,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBackdropPaddingY : 2,
        scaleBackdropPaddingX : 2,
        angleShowLineOut : true,
        angleLineColor : "rgba(255,255,255,0.3)",
        angleLineWidth : 1,
        pointLabelFontFamily : "Open Sans",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 14,
        pointLabelFontColor : "#333333",
        pointDot : false,
        pointDotRadius : 3,
        pointDotStrokeWidth : 1,
        datasetStroke : true,
        datasetStrokeWidth : 1,
        datasetFill : true,
        animation : true,
        animationSteps : 40,
        animationEasing : "easeOutQuart",
        //onAnimationComplete : null,
        responsive: true,
        maintainAspectRatio: true,
        showTooltips: false,
    };
    var ctx = document.getElementById("radarChart").getContext("2d");

    var radarData = { labels : ["Good[" + goods[0] + "]","Point[" + goods[1]*100 + "]","Baht(THB)[" + goods[2]*100 + "]","Dollar(USD)[" + goods[3]*100 + "]","Level[" + goods[4] + "]"],
        datasets : [
            {
                fillColor : 'rgba(151,187,205,0.7)',
                strokeColor : 'rgba(151,187,205,1)',
                pointColor : 'rgba(151,187,205,1)',
                pointStrokeColor : '#fff',
                data : goods
            }
        ]
    };

    $(document).ready(function() {
    var myRadarChart = new Chart(ctx).Radar(radarData,radarOptions);


    document.getElementById("point").innerHTML = goods[1]*100;


    console.log("create");
    });
}

function redraw() {
    console.log("delete");
    var c = document.getElementById("radarChart");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    createChart();
}

function feedCheck() {
    console.log("check");
    var data = new Object;
    data.id = sessionStorage['player'];
    data.token = sessionStorage['Token'];
    $.ajax({
        type: 'POST',
        url: "https://api.pbapp.net/Player/"+sessionStorage['player']+"/data/all?api_key=141073538&iodocs=true",
        datatype: 'json',
        data: data,
        async: true,
        success: function(d){
            if(d.response.player.goods.length != player_info.goods.length || d.response.player.points.length != player_info.points.length || d.response.player.badges.length != player_info.badges.length || d.response.player.level != player_info.level){
                player_info = d.response.player;

                console.log(player_info);

                goods[0] = 0,goods[1] = 0,goods[2] = 0,goods[3] = 0,goods[4] = 0;
                for(var i=0;i<player_info.points.length;i++) {
                    if(player_info.points[i].reward_name == "dollar_usd") {
                        goods[3] = d.response.player.points[i].value/100;
                    }
                    if(player_info.points[i].reward_name == "point") {
                        goods[1]= d.response.player.points[i].value/100;
                    }
                    if(player_info.points[i].reward_name == "baht_thb") {
                        goods[2]= d.response.player.points[i].value/100;
                    }
                }
                for(var i=0;i<player_info.goods.length;i++) {
                    goods[0] += d.response.player.goods[i].amount;
                }
                goods[4]= d.response.player.level;

                redraw();
            }
            for(var i=0;i<player_info.points.length;i++) {
                if(d.response.player.points[i].value != player_info.points[i].value) {
                    player_info = d.response.player;

                    console.log(player_info);

                    goods[0] = 0,goods[1] = 0,goods[2] = 0,goods[3] = 0,goods[4] = 0;
                    for(var i=0;i<player_info.points.length;i++) {
                        if(player_info.points[i].reward_name == "dollar_usd") {
                            goods[3] = d.response.player.points[i].value/100;
                        }
                        if(player_info.points[i].reward_name == "point") {
                            goods[1]= d.response.player.points[i].value/100;
                        }
                        if(player_info.points[i].reward_name == "baht_thb") {
                            goods[2]= d.response.player.points[i].value/100;
                        }
                    }
                    for(var i=0;i<player_info.goods.length;i++) {
                        goods[0] += d.response.player.goods[i].amount;
                    }
                    goods[4]= d.response.player.level;

                    redraw();
                }
            }
            for(var i=0;i<player_info.goods.length;i++) {
                if(d.response.player.goods[i].amount != player_info.goods[i].amount) {
                    player_info = d.response.player;

                    console.log(player_info);

                    goods[0] = 0,goods[1] = 0,goods[2] = 0,goods[3] = 0,goods[4] = 0;
                    for(var i=0;i<player_info.points.length;i++) {
                        if(player_info.points[i].reward_name == "dollar_usd") {
                            goods[3] = d.response.player.points[i].value/100;
                        }
                        if(player_info.points[i].reward_name == "point") {
                            goods[1]= d.response.player.points[i].value/100;
                        }
                        if(player_info.points[i].reward_name == "baht_thb") {
                            goods[2]= d.response.player.points[i].value/100;
                        }
                    }
                    for(var i=0;i<player_info.goods.length;i++) {
                        goods[0] += d.response.player.goods[i].amount;
                    }
                    goods[4]= d.response.player.level;

                    redraw();
                }
            }
        }
    });
}

function cancel(){
    $("#edit-Name-box").animate({
        'top': '20vw',
        'opacity': 0
    },500);
    $("#edit-Email-box").animate({
        'top': '20vw',
        'opacity': 0
    },500);
    $("#edit-Phone-num-box").animate({
        'top': '20vw',
        'opacity': 0
    },500);
    $("#edit-BD-box").animate({
        'top': '20vw',
        'opacity': 0
    },500);
    $(".edit-container").animate({
        'z-index': 0
    },500);
    $('body > .wheel-tran').remove();
    $("#edit-Name-box").css('z-index','-1');
    $("#edit-Email-box").css('z-index','-1');
    $("#edit-Phone-num-box").css('z-index','-1');
    $("#edit-BD-box").css('z-index','-1');
    setTimeout(function(){
        document.getElementById("firstname").value='';
        document.getElementById("lastname").value='';
        document.getElementById("email").value='';
        document.getElementById("phone-number").value='';
        document.getElementById("date").value='';
        document.getElementById("month").value='';
        document.getElementById("year").value='';
    },500);
}

function Update() {
    var data = new Object;
    data.token = sessionStorage['Token'];
    data.id = sessionStorage['player'];
    data.first_name = document.getElementById("firstname").value;
    data.last_name = document.getElementById("lastname").value;
    data.email = document.getElementById("email").value;
    if($("#phone-number").intlTelInput("getNumber") != "+" + $("#phone-number").intlTelInput("getSelectedCountryData").dialCode){
        data.phone_number = $("#phone-number").intlTelInput("getNumber");
    }
    if(document.getElementById("year").value != '' && document.getElementById("month").value != '' && document.getElementById("date").value != '') {
        data.birth_date = document.getElementById("year").value + "-" + document.getElementById("month").value + "-" + document.getElementById("date").value;
    }
    $.ajax({
        type: 'POST',
        url: "https://api.pbapp.net/Player/"+ sessionStorage['player'] +"/update?api_key=141073538&iodocs=true",
        datatype: 'json',
        data: data,
        async: true,
        success: function(d){
            console.log(d);
            if(d.success == false) {
                alert("ERROR");
            }
            location.reload();
        }
    });
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

$(document).ready(function() {
    getPlayerInfo();
    createChart();
    $("#phone-number").intlTelInput({
        onlyCountries: ['th','us','jp','in','uk','kr','it','au','cn','sg','my','ua','ru','nz'],
        preferredCountries: ['th'],
        separateDialCode: true
    });

    if(player_info.image == "https://www.pbapp.net/images/default_profile.jpg") {
        document.getElementById("Profile-pic").setAttribute("style","background-image: url(" + "img/null_profile.jpg" + ");");
    }else {
        document.getElementById("Profile-pic").setAttribute("style","background-image: url(" + player_info.image + ");");
    }
    if(player_info.first_name != player_info.username) {
        document.getElementById("Name").innerHTML = capitalize(player_info.first_name) + " " + capitalize(player_info.last_name);
    }else {
        document.getElementById("Name").innerHTML = "Guest";
    }
    if(player_info.email != "qa1+"+ player_info.username + "@playbasis.com") {
        document.getElementById("Email").innerHTML = player_info.email;
    }else {
        document.getElementById("Email").innerHTML = "Guest@email.com";
    }
    if(player_info.phone_number != null) {
        document.getElementById("Phone-num").innerHTML = player_info.phone_number.slice(0,3) + " " + player_info.phone_number.slice(3,5) + "-" + player_info.phone_number.slice(5,8) + "-" + player_info.phone_number.slice(8,player_info.phone_number.length);
    }else {
        document.getElementById("Phone-num").innerHTML = "+66 XX-XXX-XXXX";
    }
    if(player_info.birth_date != null) {
        document.getElementById("BD").innerHTML = player_info.birth_date.slice(8,10) + "/" + player_info.birth_date.slice(5,7) + "/" + player_info.birth_date.slice(0,4);
    }else {
        document.getElementById("BD").innerHTML = "DD/MM/YYYY";
    }
    $("#edit-Name").click(function() {
        $('body').append('<div class="wheel-tran" style="width:100%;height:100%;position: absolute;z-index: 1;top: 0px;left: 0px;background-color: #0000006e;"></div>')
        $(".edit-container").animate({
            'z-index': 2
        },50);
        $("#edit-Name-box").animate({
            'top': "+=30vw",
            'opacity': 1
        },500);
        $("#edit-Name-box").css('z-index','3');
    });
    $("#edit-Email").click(function() {
        $('body').append('<div class="wheel-tran" style="width:100%;height:100%;position: absolute;z-index: 1;top: 0px;left: 0px;background-color: #0000006e;"></div>')
        $(".edit-container").animate({
            'z-index': 2
        },50);
        $("#edit-Email-box").animate({
            'top': "+=30vw",
            'opacity': 1
        },500);
        $("#edit-Email-box").css('z-index','3');
    });
    $("#edit-Phone-num").click(function() {
        $('body').append('<div class="wheel-tran" style="width:100%;height:100%;position: absolute;z-index: 1;top: 0px;left: 0px;background-color: #0000006e;"></div>')
        $(".edit-container").animate({
            'z-index': 2
        },50);
        $("#edit-Phone-num-box").animate({
            'top': "+=30vw",
            'opacity': 1
        },500);
        $("#edit-Phone-num-box").css('z-index','3');
    });
    $("#edit-BD").click(function() {
        $('body').append('<div class="wheel-tran" style="width:100%;height:100%;position: absolute;z-index: 1;top: 0px;left: 0px;background-color: #0000006e;"></div>')
        $(".edit-container").animate({
            'z-index': 2
        },50);
        $("#edit-BD-box").animate({
            'top': "+=30vw",
            'opacity': 1
        },500);
        $("#edit-BD-box").css('z-index','3');
    });

    setInterval(function() {
        feedCheck();
    },12000);
});

</script>
<style type="text/css">

body{
    font-family:"futura-pt",sans-serif;
    background-image: url('img/BG.jpg');
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    overflow: scroll;
}
.chart-container {
    display: grid;
    height: 85%;
    width: 90%;
    margin: 15px auto;
    padding: 0px;
    background-color: white;
    opacity: 0.65;
    border-radius: 15px;
    z-index: 1;
    justify-items:center;
}
.chart-demo {
    display: grid;
    height: 100%;
    align-items: center;
    justify-items: center;
}
.info {
    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
}
.Profile-pic {
    margin-top: 15px;
    height: 120px;
    width: 120px;
    background-size: cover;
}
.info-box {
    width: 85%;
    text-align: left;
}
.info-box p {
    overflow: hidden;
    font-size: 14px;
}
.info-box span {
    top: -12px;
    color: black;
}
.box {
    display: inline-block;
    width: 90%;
}
#edit-Name {
    color: black;
}
.Name-box h1{
    margin: 0.67em;
    display: inline-block;
}
#edit-Name {
    top: 0;
}
.edit-container {
    position: absolute;
    display: grid;
    height: 85%;
    width: 100%;
    align-items: center;
    justify-items: center;
    z-index: 0;
}
.edit-box {
    position: absolute;
    display: grid;
    width: 80%;
    top: 20vw;
    background-color: white;
    border-radius: 15px;
    align-items: center;
    justify-items: center;
    opacity: 0;
}
.edit-box hr {
    display: block;
    width: 90%;
    margin-top: 0;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
}
.edit-box input {
    width: 40%;
    height: 30px;
    margin: 10px 5px;
    padding-left: 5px;
    text-align: center;
    border: 1px solid white;
    border-bottom: 1px solid #ccc;
}
.edit-box div {
    width: 100%;
    display: block;
    text-align: center;
}
.edit-box button {
    width: 25%;
    height: 30px;
    margin: 5px;
    border-radius: 15px;
}
.edit-box #country-code {
    width: 20%;
}
#edit-BD-box input {
    width: 20%;
}
.edit-box #email {
    width: 70%;
}
.edit-box #phone-number {
    width: 200px;
}
#edit-Phone-num-box .intl-tel-input {
    width: unset;
    display: block;
    margin: 10px;
    text-align: center;
}
.intl-tel-input .selected-flag .iti-flag {
    width: 20px;
}
.intl-tel-input *  {
    color: black;
}
.Confirm {
    background-color: #44d134;
    color: white;
}
.Cancel {
    border-color: red;
    color: red;
}
#edit-Phone-num-box .selected-dial-code {
    padding-left: 12px;
}
.iti-flag {
    background-image: url("path/to/flags.png");
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2 / 1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
    .iti-flag {
        background-image: url("path/to/flags@2x.png");
    }
}
*:focus::placeholder {
    opacity: 0;
}

</style>
<body>
<%@include file="top.jsp" %>

<div class="chart-container">
    <div class="info">
        <div class="Profile-pic" id="Profile-pic"></div>
        <div class="Name-box"><h1 id="Name"></h1><span class="glyphicon glyphicon-edit" id="edit-Name"></span></div>
        <div class="info-box">
            <div class="box"><h6>Email</h6><p id="Email"></p></div><span class="glyphicon glyphicon-edit" id="edit-Email"></span>
            <div class="box"><h6>Phone</h6><p id="Phone-num"></p></div><span class="glyphicon glyphicon-edit" id="edit-Phone-num"></span>
            <div class="box"><h6>Birth Date</h6><p id="BD"></p></div><span class="glyphicon glyphicon-edit" id="edit-BD"></span>
            <div class="box"><h6>Point</h6><p id="point"></p></div>
        </div>
    </div>
    <div class="chart-demo">
        <canvas id="radarChart"></canvas>
    </div>
</div>
<div class="edit-container">
    <div class="edit-box" id="edit-Name-box">
        <h1>Name</h1>
        <hr>
        <div>
            <input type="text" id="firstname" placeholder="First name">
            <input type="text" id="lastname" placeholder="Last name">
        </div>
        <div>
            <button class="Confirm" onclick="Update()">Confirm</button>
            <button class="Cancel" onclick="cancel()">Cancel</button>
        </div>
    </div>
    <div class="edit-box" id="edit-Email-box">
        <h1>Email</h1>
        <hr>
        <input type="text" id="email" placeholder="Email@email.com">
        <div>
            <button class="Confirm " onclick="Update()">Confirm</button>
            <button class="Cancel" onclick="cancel()">Cancel</button>
        </div>
    </div>
    <div class="edit-box" id="edit-Phone-num-box">
        <h1>Phone Number</h1>
        <hr>
        <input type="tel" id="phone-number">
        <div>
            <button class="Confirm" onclick="Update()">Confirm</button>
            <button class="Cancel" onclick="cancel()">Cancel</button>
        </div>
    </div>
    <div class="edit-box" id="edit-BD-box">
        <h1>Birth Date</h1>
        <hr>
        <div>
            <input type="text" id="date" placeholder="DD">
            <input type="text" id="month" placeholder="MM">
            <input type="text" id="year" placeholder="YYYY">
        </div>
        <div>
            <button class="Confirm" onclick="Update()">Confirm</button>
            <button class="Cancel" onclick="cancel()">Cancel</button>
        </div>
    </div>
</div>

<%@include file="bottom.jsp" %>

</body>
</html>