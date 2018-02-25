window.onload = function () {

    var center = { x: 350, y: 350 };

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

    var rim = drawRim(two, center.x, center.y, rimDiameter, rimHeigth);
    var hub = drawHub(two, center.x, center.y, hubFlangeWidth);
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

