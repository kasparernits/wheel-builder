window.onload = function () {

    var pattern = {
        name: '3cross',
        numOfSpokes: 2,
        // tbd: convert s to array
        s1 : { h: 1, r: 1},
        s2 : { h: 4, r: 4}
    }

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
    var rim = new circle('8bar super',622,30,32);

    for(i=0;i<=hbt30.numOfHoles;i++)
        hbt30.addHole(new hole(i,hbt30.calcHoleCoords(i).newX, hbt30.calcHoleCoords(i).newY));

    for(i=0;i<=rim.numOfHoles;i++)
        rim.addHole(new hole(i,rim.calcHoleCoords(i).newX, rim.calcHoleCoords(i).newY));

    var spokeWidth = 2;
    var spokeLength = 280;
    var nippleLength = 14;
    var nippleWidth = 4;

    var elem = document.getElementById('workshop');
    var params = { fullscreen: true }
    var two = new Two(params).appendTo(elem);

    drawCircle(two, center.x, center.y, rim);
    drawCircle(two, center.x, center.y, hbt30);

    drawLine(two, hbt30, rim);

    var spokesRow1 = drawSpokes(two, 750, 320, 1, 16, 'black');
    var spokesRow2 = drawSpokes(two, 750, 650, 17, 32, 'black');

    two.update();

    function drawCircle(two, x, y, circle) {
        var c = two.makeCircle(x, y, circle.diameter / 2);
        c.fill = 'white';
        c.stroke = 'black';
        c.linewidth = circle.width;
        for(i=0;i<=circle.numOfHoles;i++){
            two.makeCircle(circle.holes[i].x,circle.holes[i].y,3);
        }
    }

    function drawLine(two, circle1, circle2) {
        two.makeLine(circle1.holes[pattern.s1.h].x, circle1.holes[pattern.s1.h].y, circle2.holes[pattern.s1.r].x, circle2.holes[pattern.s1.r].y);
        two.makeLine(circle1.holes[pattern.s2.h].x, circle1.holes[pattern.s2.h].y, circle2.holes[pattern.s2.r].x, circle2.holes[pattern.s2.r].y);
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

