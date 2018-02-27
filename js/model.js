window.onload = function () {

    var center = { x: 350, y: 350 };

    class spokeHole {
        constructor(side, id, x, y){
            this.side = side;
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }

    class hub {
        constructor(name,flangeWidth,numSpokeHoles){
            this.name = name;
            this.flangeWidth = flangeWidth;
            this.numSpokeHoles = numSpokeHoles;
            this.spokeHoles = [];
            this.addSpokeHole = function (newObject) {
                this.spokeHoles.push(newObject);
            };
        }

        calcSpokeHoleCoords(thisHole) {
            var theta = ((Math.PI * 2) / this.numSpokeHoles);
            var angle = (theta * thisHole);
            var newX = (this.flangeWidth / 2) * Math.cos(angle) + center.x; // dont like this global variable, to fix later
            var newY = (this.flangeWidth / 2) * Math.sin(angle) + center.y;
            return {newX,newY};
        }

    }

    var hbt30 = new hub('hbt30',70.6,16);

    for(i=1;i<=hbt30.numSpokeHoles;i++){
        hbt30.addSpokeHole(new spokeHole('a',i,hbt30.calcSpokeHoleCoords(i).newX, hbt30.calcSpokeHoleCoords(i).newY));
    }    

    console.log(hbt30); 

    function draw(o, x, y){

        console.log('tbd...');
    }

    // Center point of the rim
    var y = 350;
    var x = 350;

    // 8bar Super Felge
    var rimDiameter = 622;
    var rimHeigth = 30;
    var rimNumOfHoles = 32;

    // Sturmey-Archer HBT 30 Front Hub
    var hubFlangeWidth = 70.6;
    var hubRadius = hubFlangeWidth / 2;
    var hubNumOfSpokeHoles = 16;

    // DT Swiss Competition Spoke
    var spokeWidth = 2;
    var spokeLength = 280;

    // DT Swiss Nipple
    var nippleLength = 14;
    var nippleWidth = 4;

    var elem = document.getElementById('workshop');
    var params = { fullscreen: true }
    var two = new Two(params).appendTo(elem);

    for(i=1;i<=hbt30.numSpokeHoles-1;i++){ // to fix
        two.makeCircle(hbt30.spokeHoles[i].x, hbt30.spokeHoles[i].y, 3).fill='red';
    }

    var rim = drawRim(two, center.x, center.y, rimDiameter, rimHeigth);
    var myHub = drawHub(two, center.x, center.y, hubFlangeWidth);
    var spoke1 = drawSpoke(two, center.x, getY1(), spokeLength, 'red');

    var spokesRow1 = drawSpokes(two, 750, 320, 1, 16, 'black');
    var spokesRow2 = drawSpokes(two, 750, 650, 17, 32, 'black');

    two.update();

    function getY1() {
        return center.y - hubFlangeWidth / 2;
    }

    function getY2() {
        return center.y - rimDiameter / 2;
    }

    function drawSpoke(two, x, y, length, color) {
        var spoke = two.makeLine(x, y, x, y - length);
        spoke.linewidth = spokeWidth;
        var spokeEnd = two.makeCircle(x, y, 3);
        var nipple = two.makeLine(x, y - length, x, (y - length) + nippleLength);
        nipple.linewidth = nippleWidth;
        var group = two.makeGroup(spoke, spokeEnd, nipple);
        group.stroke = color;
        group.fill = color;
    }

    function drawSpokes(two, startX, startY, from, to, color) {
        for (var i = from; i <= to; i++) {
            drawSpoke(two, startX, startY, spokeLength, color);
            var text = two.makeText(i, startX, startY + 20, {
                alignment: 'center'
            });
            startX = startX + 18;
        }
    }

    function drawRim(two, x, y, rimDiameter, heigth) {
        var rim = two.makeCircle(x, y, rimDiameter / 2);
        rim.fill = 'white';
        rim.stroke = 'black';
        rim.linewidth = heigth;

        for (var i = 1; i <= rimNumOfHoles; i++) {
            drawPointsOnCircle(rimDiameter / 2, i, rimNumOfHoles, 2);
        }
    }

    function drawHub(two, x, y, flangeWidth) {
        var hub = two.makeCircle(x, y, flangeWidth / 2)
        hub.fill = 'white';
        hub.stroke = 'black';
        hub.linewidth = 8;

        for (var i = 1; i <= hubNumOfSpokeHoles; i++) {
            drawPointsOnCircle(hubRadius, i, hubNumOfSpokeHoles, 2);
        }
    }

    function drawPointsOnCircle(R, currentPoint, numOfPoints, size) {

        var theta = ((Math.PI * 2) / numOfPoints);
        var angle = (theta * currentPoint);
        var newX = R * Math.cos(angle) + center.x;
        var newY = R * Math.sin(angle) + center.y;
        two.makeCircle(newX, newY, size);
    }

}

