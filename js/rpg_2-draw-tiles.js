var ts= new Tileset("map.png");

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ts.drawTile(1, ctx, 10, 10);
    ts.drawTile(5, ctx, 50, 10);
    ts.drawTile(6, ctx, 90, 10);
    ts.drawTile(7, ctx, 130, 10);
};