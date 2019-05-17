 $(function() {
   $("#draggableThree").draggable({
     revert: "invalid",
     snap: ".drapCircle",
     snapMode: "inner"
   });
   $("#dropableOne").droppable({
     accept: "#draggableThree",
     hoverClass: "ui-state-active",
     drop: function(event, ui) {
       $("#draggableThree")
         .addClass("disappear");
       $("#dropableOne")
         .addClass("colorChange")
         .addClass("bounce");
     }
   });
 });

 $(function() {
   $("#draggableOne").draggable({
     revert: "invalid"
   });
   $("#dropableTwo").droppable({
     accept: "#draggableOne",
     hoverClass: "ui-state-active",
     drop: function(event, ui) {
       $("#draggableOne")
         .addClass("disappear");
       $("#dropableTwo")
         .addClass("colorChangeGreen")
         .addClass("bounce");
     }
   });
 });

 $(function() {
   $("#draggableFour").draggable({
     revert: "invalid"
   });
   $("#dropableThree").droppable({
     accept: "#draggableFour",
     activeClass: "ui-state-hover",
     hoverClass: "ui-state-active",
     drop: function(event, ui) {
       $("#draggableFour")
         .addClass("disappear");
       $("#dropableThree")
         .addClass("colorChangeOrange")
         .addClass("bounce");
     }
   });
 });

 $(function() {
   $("#draggableTwo").draggable({
     revert: "invalid"
   });
   $("#dropableFour").droppable({
     accept: "#draggableTwo",
     activeClass: "ui-state-hover",
     hoverClass: "ui-state-active",
     drop: function(event, ui) {
       $("#draggableTwo")
         .addClass("disappear");
       $("#dropableFour")
         .addClass("colorChangeBlue")
         .addClass("bounce");
     }
   });
 });

 $(function() {
   var draggableList = $(".drabbableList");
   if (draggableList.children().length == 0) {
     $("<h4 class='out-of-stock'>Whoa!<br/>You must really like images!</h4>")
       .appendTo(drabbableList)
       .fadeIn("slow");
   }
 });