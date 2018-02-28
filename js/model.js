window.onload = function () {

    const center = { x: 350, y: 350 };

    class hole {
        constructor(id, x, y){
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }

    class circle {
        constructor(name, diameter, width, numOfHoles){
            this.name = name;
            this.diameter = diameter;
            this.width = width;
            this.numOfHoles = numOfHoles;
            this.holes = [];
            this.addHole = function (newObject) {
                this.holes.push(newObject);
            };
        }

        calcHoleCoords(thisHole) {
            var theta = ((Math.PI * 2) / this.numOfHoles);
            var angle = (theta * thisHole);
            var newX = (this.diameter / 2) * Math.cos(angle) + center.x;
            var newY = (this.diameter / 2) * Math.sin(angle) + center.y;
            return { newX, newY };
        }

    }

    var hbt30 = new circle('hbt30',70.6,10,16);

    for(i=0;i<=hbt30.numOfHoles;i++)
        hbt30.addHole(new hole(i,hbt30.calcHoleCoords(i).newX, hbt30.calcHoleCoords(i).newY));

    var rim = new circle('8bar super',622,30,32);

    for(i=0;i<=rim.numOfHoles;i++)
        rim.addHole(new hole(i,rim.calcHoleCoords(i).newX, rim.calcHoleCoords(i).newY));

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

    drawCircle(two, center.x, center.y, hbt30);

    //var spoke1 = drawSpoke(two, center.x, getY1(), spokeLength, 'red');
    //var spokesRow1 = drawSpokes(two, 750, 320, 1, 16, 'black');
    //var spokesRow2 = drawSpokes(two, 750, 650, 17, 32, 'black');

    two.update();

    function drawCircle(two, x, y, circle) {
        var hub = two.makeCircle(x, y, circle.diameter);
        hub.fill = 'white';
        hub.stroke = 'black';
        hub.linewidth = circle.width;
    }

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

}

