
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

