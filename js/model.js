window.onload = function () {

    var drawn = 0;
    
    // ugly, fix later (for coloring out drawn spokes)
    var startx = 750, starty = 320;

    // 3 cross pattern
    var p = [
        // Side 1
        {id : 0, h: 13, r: 31},
        {id : 1, h: 4, r: 1},
        {id : 2, h: 15, r: 3},
        {id : 3, h: 1, r: 7},
        {id : 4, h: 3, r: 11},
        {id : 5, h: 5, r: 15},
        {id : 6, h: 7, r: 19},
        {id : 7, h: 9, r: 23},
        {id : 8, h: 11, r: 27},

        {id : 9, h: 2, r: 29},
        {id :10, h: 0, r: 25},
        {id : 11, h: 14, r: 21},
        {id : 12, h: 12, r: 17},
        {id : 13, h: 10, r: 13},
        {id : 14, h: 8, r: 9},
        {id : 15, h: 6, r: 5},

        // Side 2 ...
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

    var hub = new circle('hub','hbt30',70.6,10,16);
    var rim = new circle('rim','8bar super',622,30,32);

    for(i=0;i<hub.numOfHoles;i++)
        hub.addHole(new hole(i,hub.calcHoleCoords(i-hub.numOfHoles/4).newX, hub.calcHoleCoords(i-hub.numOfHoles/4).newY));
    
    for(i=0;i<rim.numOfHoles;i++)
        rim.addHole(new hole(i,rim.calcHoleCoords(i-rim.numOfHoles/4).newX, rim.calcHoleCoords(i-rim.numOfHoles/4).newY));

    var spokeWidth = 2;
    var spokeLength = 280;

    var elem = document.getElementById('workshop');
    var params = { fullscreen: true }
    var two = new Two(params).appendTo(elem);

    drawCircle(two, center.x, center.y, rim);
    drawCircle(two, center.x, center.y, hub);
    drawUnusedSpokes(two, 750, 320, 1, 16, 'black');
    drawUnusedSpokes(two, 750, 650, 17, 32, 'black');

    window.addEventListener("keydown", addSpoke, false);

    two.update();

    function drawCircle(two, x, y, circle) {
        var c = two.makeCircle(x, y, circle.diameter / 2);
        c.fill = 'white';
        c.stroke = 'black';
        c.linewidth = circle.width;
        for(i=0;i<circle.numOfHoles;i++){
            if ((i==0 || i==circle.numOfHoles/2))
                two.makeCircle(circle.holes[i].x,circle.holes[i].y,3).fill='red';
            else
                two.makeCircle(circle.holes[i].x,circle.holes[i].y,3);
        }
    }
    
    function addSpoke(e){
        if(drawn < p.length){
            drawSpoke(two, hub, rim, drawn,'blue');
            drawUnusedSpoke(two, startx, starty, spokeLength, 'white');
            startx = startx + 18;
        }
        two.update();
        drawn = drawn + 1;
    }

    function drawSpoke(two, circle1, circle2, i, color) {
        var spoke = two.makeLine(circle1.holes[p[i].h].x, circle1.holes[p[i].h].y, circle2.holes[p[i].r].x, circle2.holes[p[i].r].y);
        var spokeEnd = two.makeCircle(circle1.holes[p[i].h].x,circle1.holes[p[i].h].y,4);
        var group = two.makeGroup(spoke,spokeEnd);
        group.fill = color;
        group.stroke = color;
    }
 
    function drawUnusedSpoke(two, x, y, length, color) {
        var spoke = two.makeLine(x, y, x, y - length);
        spoke.linewidth = spokeWidth;
        var spokeEnd = two.makeCircle(x, y, 3);
        var group = two.makeGroup(spoke, spokeEnd);
        group.stroke = color;
        group.fill = color;
    }

    function drawUnusedSpokes(two, startX, startY, from, to, color) {
        for (var i = from; i <= to; i++) {
            drawUnusedSpoke(two, startX, startY, spokeLength, color);
            var text = two.makeText(i, startX, startY + 20, {
                alignment: 'center'
            });
            startX = startX + 18; // move right by 18px
        }
    }

}

