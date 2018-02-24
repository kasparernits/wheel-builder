window.onload = function(){

  // Center point
   var y = 350;
   var x = 350;

   // 8bar Super Felge
   var rimDiameter = 622; 
   var rimHeigth = 30;

   // Sturmey-Archer HBT 30 Front
   var hubFlangeWidth = 70.6;

   var nippleLength = 14;

   var elem = document.getElementById('workshop');
   var params = { fullscreen: true}
   var two = new Two(params).appendTo(elem);
   
   var rim = drawRim(two, y, x, rimDiameter, rimHeigth);
   var hub = drawHub(two, y, x, hubFlangeWidth);

   var spoke1 = drawSpoke(two, x, getY1(), x, getY2());
   
   two.update();

   function getY1(){
        return y - hubFlangeWidth / 2;
   }

   function getY2(){
        return y - rimDiameter / 2;
   }

   function drawSpoke(two, x1, y1, x2, y2){
        var spoke = two.makeLine(x1, y1, x2, y2);
        spoke.linewidth = 2;
        spoke.stroke = 'red';
        var spokeEnd = two.makeCircle(x1, y1, 3);
        spokeEnd.fill = 'red';
        spokeEnd.stroke = 'red';
        var nipple = two.makeLine(x1, (y - rimDiameter / 2) + nippleLength, x2, y2);
        nipple.linewidth = 5;
        nipple.stroke = 'red';
   }

   function drawRim(two, y, x, radius, heigth){
        var rim = two.makeCircle(y, x, radius / 2);
        rim.fill = 'white';
        rim.stroke = 'black';
        rim.linewidth = heigth;
        return rim;
   }

    function drawHub(two, y, x, flangeWidth){
        var hub = two.makeCircle(y, x, flangeWidth / 2)
        hub.fill = 'white';
        hub.stroke = 'black';
        hub.linewidth = 8;

        // Draw spoke holes, TBD

        var r = flangeWidth / 2;

        two.makeCircle(y + r, x, 2);

        for(i = 1; i <= 1; i++){

            var newX = r * Math.cos(i) + x;
            var newY = r * Math.sin(i) + y;
            
            two.makeCircle(newY, newX, 2);

        }

        return hub;
   }

}


