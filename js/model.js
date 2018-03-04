window.onload = function () {

    // 3 cross pattern
    var p = [
        {id : 0, h: 12, r: 0},
        {id : 1, h: 14, r: 1},
        {id : 2, h: 0, r: 4},
        {id : 3, h: 2, r: 8},
        {id : 4, h: 4, r: 12},
        {id : 5, h: 6, r: 16},
        {id : 6, h: 8, r: 20},
        {id : 7, h: 10, r: 24},
        {id : 8, h: 12, r: 28}

    ];
    
    const center = { x: 350, y: 350 };

    class hole {
        constructor(id, x, y){
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }

    class circle {
        constructor(type, name, diameter, width, numOfHoles){
            this.type = type;
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

    var hbt30 = new circle('hub','hbt30',70.6,10,16);
    var rim = new circle('rim','8bar super',622,30,32);

    for(i=0;i<hbt30.numOfHoles;i++)
        hbt30.addHole(new hole(i,hbt30.calcHoleCoords(i).newX, hbt30.calcHoleCoords(i).newY));

    for(i=0;i<rim.numOfHoles;i++)
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

    for(i=0;i<p.length;i++)
        drawLine(two, hbt30, rim, i);

    var spokesRow1 = drawSpokes(two, 750, 320, 1, 16, 'black');
    var spokesRow2 = drawSpokes(two, 750, 650, 17, 32, 'black');

    two.update();

    function drawCircle(two, x, y, circle) {
        var c = two.makeCircle(x, y, circle.diameter / 2);
        c.fill = 'white';
        c.stroke = 'black';
        c.linewidth = circle.width;
        for(i=0;i<circle.numOfHoles;i++){
            if(i==0 && circle.type == 'rim'){            
                var newX = (circle.diameter / 2) * Math.cos(0.07) + center.x;
                var newY = (circle.diameter / 2) * Math.sin(0.07) + center.y;
                two.makeCircle(newX,newY,6);
                two.makeCircle(circle.holes[i].x,circle.holes[i].y,3).fill='red';
            }
            else if ((i==0 || i==8) && circle.type == 'hub')
                two.makeCircle(circle.holes[i].x,circle.holes[i].y,3).fill='red';
            else
                two.makeCircle(circle.holes[i].x,circle.holes[i].y,3);
        }
    }

    function drawLine(two, circle1, circle2, i) {
        two.makeLine(circle1.holes[p[i].h].x, circle1.holes[p[i].h].y, circle2.holes[p[i].r].x, circle2.holes[p[i].r].y);
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

