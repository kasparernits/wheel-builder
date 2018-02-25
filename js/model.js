window.onload = function () {

    var center = { x: 350, y: 350 };

    // Center point
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

    // DT Swiss Nipple
    var nippleLength = 14;
    var nippleWidth = 4;

    // DT Swiss Competition
    var spokeWidth = 2;

    var elem = document.getElementById('workshop');
    var params = { fullscreen: true }
    var two = new Two(params).appendTo(elem);

    var rim = drawRim(two, center.x, center.y, rimDiameter, rimHeigth);
    var hub = drawHub(two, center.x, center.y, hubFlangeWidth);
    var spoke1 = drawSpoke(two, center.x, getY1(), center.x, getY2());

    two.update();

    function getY1() {
        return center.y - hubFlangeWidth / 2;
    }

    function getY2() {
        return center.y - rimDiameter / 2;
    }

    function drawSpoke(two, x1, y1, x2, y2) {
        var spoke = two.makeLine(x1, y1, x2, y2);
        spoke.linewidth = spokeWidth;
        spoke.stroke = 'red';
        var spokeEnd = two.makeCircle(x1, y1, 3);
        spokeEnd.fill = 'red';
        spokeEnd.stroke = 'red';
        var nipple = two.makeLine(x1, (center.y - rimDiameter / 2) + nippleLength, x2, y2);
        nipple.linewidth = nippleWidth;
        nipple.stroke = 'red';
    }

    function drawRim(two, x, y, radius, heigth) {
        var rim = two.makeCircle(y, x, radius / 2);
        rim.fill = 'white';
        rim.stroke = 'black';
        rim.linewidth = heigth;

        for (var i = 1; i <= rimNumOfHoles; i++) {
            drawPoint(rimDiameter / 2, i, rimNumOfHoles);
        }

        return rim;
    }

    function drawHub(two, x, y, flangeWidth) {
        var hub = two.makeCircle(x, y, flangeWidth / 2)
        hub.fill = 'white';
        hub.stroke = 'black';
        hub.linewidth = 8;

        for (var i = 1; i <= hubNumOfSpokeHoles; i++) {
            drawPoint(hubRadius, i, hubNumOfSpokeHoles);
        }

        return hub;
    }

    function drawPoint(R, currentPoint, numOfPoints) {

        var theta = ((Math.PI * 2) / numOfPoints);
        var angle = (theta * currentPoint);
        var newX = R * Math.cos(angle) + x;
        var newY = R * Math.sin(angle) + y;
        two.makeCircle(newX, newY, 2);
    }

}


