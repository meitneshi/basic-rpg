function Tileset(url) {

    //load image in attribut image
    this.image = new Image();
    this.image.tilesetReference = this;
    this.image.onload = function () {
        if (!this.complete) {
            window.alert("An error Occured");
            throw new Error("Error while loading tileset named '" + url + "'");
        }
        //specify the width of a tile -- 32px here
        this.tilesetReference.width = this.width / 32
    };
    this.image.src = "tilesets/" + url;
}

//Method to draw tile number 'number', in the 2D context "ctx" with coordinate x and y
Tileset.prototype.drawTile = function (number, ctx, x, y) {
    var tileXSource = number % this.width;
    if (tileXSource === 0) {
        tileXSource = this.width;
    }

    var tileYSource = Math.ceil(number / this.width);

    var xSource = (tileXSource - 1) * 32;
    var ySource = (tileYSource - 1) * 32;

    //temporary draw th grid
    ctx.strokeRect(x, y, 32, 32);
    ctx.drawImage(this.image, xSource, ySource, 32, 32, x, y, 32, 32);
};