// NOTES: 5/31/17
// I have some problems:
// 1. need to add the double/triple classes to all restos of the same rid, not just the last one clicked
// 2. Need to fix the first onClick function, it doesn't even check for number of clicks
// 3. Need to make sure I'm removing the double/triple class when a resto is unclicked
//    And make sure isClicked[x][y] is set back to false.
// 4. 

$(document).ready(function(){
  function resto(name, rid) {
    this.name = name;
    this.rid = rid;
  }

  var restoList = ['Tiny Bistro', 'Pijiu Belly', 'La Fonda', 'Antico', 'Yeah Burger', 'Bartaco', 'Star Provisions', 'Taqueria Del Sol'];
  var numFilter = 0;
  var numActiveFilter = 0;
  var isClicked = [];
  var restoObjList = [];

  ////alert(restoObjList.length);
  ////alert(isClicked);

  for (i = 0; i < restoList.length; i++) {
    var restoName = restoList[i];
    isClicked[i] = [false];
    var newResto = new resto(restoName, i);
    restoObjList.push(newResto);
    ////alert(isClicked);
    ////alert(restoObjList);
  }

  // //alert(restoObjList[2].name + " " + restoObjList[2].rid);

  $.each(restoObjList, function(index, restoObj) {
      $('#demo').append("<a href='#' id='" + restoObj.rid + "_" + numFilter + "' class='list-group-item rid"+restoObj.rid+"'>" + restoObj.name + "</a>");
  });

  $("#demo .list-group-item").click(function() {
    $(this).toggleClass("list-group-item-info");
    var composite = this.id;
    
    var coords    = composite.split('_');

    var rid = coords[0];
    var fid = coords[1];

    var clicked = isClicked[rid][fid];
    isClicked[rid][fid] = !clicked;
    //alert(rid + " "+ fid +" " + isClicked);

    var clickCounter = 0;

    for (i = 0; i <= numFilter; i++) {
      clickCounter += (isClicked[rid][i]) ? 1 : 0;
      //alert("pass: " + i + " clicks: " + clickCounter);
    }

    // If it's clicked twice or more, add a special class
    // This actually should add a class for if the number of clicks is equal to the number of active filters
    //    which is the case when all filters have chosen that resto!
    if (clickCounter < 2 ) {
      $('.rid'+rid).removeClass("double");
    } else if (clickCounter == 2) {
      $('.rid'+rid+'.list-group-item-info').addClass("double");
      $('.rid'+rid).removeClass("triple");
    } else if (clickCounter > 2 ) {
      $('.rid'+rid).removeClass("double");
      $('.rid'+rid+'.list-group-item-info').addClass('triple');
    }
  });

  $('#addFilter').click(function () {
    numFilter += 1;
    var listID = "filter" + numFilter;
    $('#filterRow').append("<div class='col-sm-2'><ul id='" + listID + "' class='list-group'></ul></div>");
    
    $.each(restoObjList, function(index, restoObj) {
      $('#'+listID).append("<a href='#' id='" + restoObj.rid + "_" + numFilter + "' class='list-group-item rid"+restoObj.rid+"'>" + restoObj.name + "</a>");
      isClicked[restoObj.rid][numFilter] = false;
    });

    $("#" + listID + " .list-group-item").click(function() {
      $(this).toggleClass("list-group-item-info");
      var composite = this.id;
      
      var coords    = composite.split('_');

      var rid = coords[0];
      var fid = coords[1];

      var clicked = isClicked[rid][fid];
      isClicked[rid][fid] = !clicked;
      ////alert(rid + " "+ fid +" " + isClicked); 

      // count all the clicks of this restaurant
      var clickCounter = 0;

      for (i = 0; i <= numFilter; i++) {
        clickCounter += (isClicked[rid][i]) ? 1 : 0;
        //alert("pass: " + i + " clicks: " + clickCounter);
      }

      // If it's clicked twice or more, add a special class
      // This actually should add a class for if the number of clicks is equal to the number of active filters
      //    which is the case when all filters have chosen that resto!
      if (clickCounter < 2 ) {
        $('.rid'+rid).removeClass("double");
      } else if (clickCounter == 2) {
        $('.rid'+rid+'.list-group-item-info').addClass("double");
        $('.rid'+rid).removeClass("triple");
      } else if (clickCounter > 2 ) {
        $('.rid'+rid).removeClass("double");
        $('.rid'+rid+'.list-group-item-info').addClass('triple');
      }

    });
  });

});
