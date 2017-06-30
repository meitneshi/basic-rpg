var mapArr = null;
var tileSetMap = null;
var characters = new Array();

function Map(name) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'maps/' + name + '.json',
        success: function (data) {
            mapArr = data.map;
            tileSetMap = new Tileset(data.tileset);
        }
    });
}

Map.prototype.getHeight = function () {
    return mapArr.length;
};

Map.prototype.getWidth = function () {
    return mapArr[0].length;
};

Map.prototype.drawMap = function (context) {
    //draw Tile
    for (var i = 0, l = mapArr.length; i < l; i++) {
        var line = mapArr[i];
        var y = i * 32;
        for (var j = 0, k = line.length; j < k; j++) {
            tileSetMap.drawTile(line[j], context, j * 32, y);
        }
    }
};

Map.prototype.drawPlayer = function (context) {
    //draw player
    for (var i = 0; i < characters.length; i++) {
        characters[i].drawCharacter(context);
    }
};

Map.prototype.addCharacter = function (charac) {
    characters.push(charac);
};