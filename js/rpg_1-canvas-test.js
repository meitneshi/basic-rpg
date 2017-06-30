var smiley = new Image();
smiley.src = "sprites/smiley.png";

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // draw filled blue rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 50);

    //draw empty red rectangle
    ctx.strokeStyle = 'red';
    ctx.strokeRect(75, 75, 50, 50);

    //draw image (img, dx, dy) -> simple positionnement (dx, dy)
    ctx.drawImage(smiley, 200, 5);

    //draw image (img, dx, dy, dw, dh) -> positionnement (dx, dy) + taille (dw, dh)
    ctx.drawImage(smiley, 200, 60, 100, 50);

    //draw image (img, sx, sy, sw, sh, dx, dy, dw, dh) -> positionement (dx, dy) + taille (dw, dh) + partie de l'iamge source a dessiner (sx, sy, sw, sd)
    ctx.drawImage(smiley, 0, 0, 10, 19, 200, 100, 10, 19);
};