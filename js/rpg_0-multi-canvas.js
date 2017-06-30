var map = new Map("map1");

var player = new Character("player.png", 7, 14, ORIENTATION.DOWN);
map.addCharacter(player);

window.onload = function () {
    var canvasMap = document.getElementById('canvasMap');
    var ctxMap = canvasMap.getContext('2d');

    var canvasPlayer = document.getElementById('canvasPlayer');
    var ctxPlayer = canvasPlayer.getContext('2d');

    //this code generate issue when we want to create a map larger than the screen
    canvasMap.width = map.getWidth() * 32;
    canvasMap.height = map.getHeight() * 32;

    canvasPlayer.width = map.getWidth() * 32;
    canvasPlayer.height = map.getHeight() * 32;

    setTimeout(function () {
        map.drawMap(ctxMap);

        setInterval(function () {
            map.drawPlayer(ctxPlayer);
        }, 40);
    }, 19);

    window.onkeydown = function () {
        var e = event || window.event;
        var key = e.which || e.keyCode;
        switch (key) {
            case 38 :
                player.move(ORIENTATION.UP, map);
                break;
            case 40 :
                player.move(ORIENTATION.DOWN, map);
                break;
            case 37 :
                player.move(ORIENTATION.LEFT, map);
                break;
            case 39 :
                player.move(ORIENTATION.RIGHT, map);
                break;
        }
        return true;
    }
};