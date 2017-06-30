//Direction constant, the number represent the line of the spritesheet
var ORIENTATION = {
    "DOWN": 0,
    "LEFT": 1,
    "RIGHT": 2,
    "UP": 3
};

//animation duration (unit = number of frame(redraw) in the loop)
var ANIMATION_DURATION = 4;
var MOVE_DURATION = 15;


/**
 * The constructor of character
 *
 * @param url
 *      The name of the spritesheet
 * @param x
 *      The case number x where we want to draw
 * @param y
 *      The case number y where we want to draw
 * @param direction
 *      The direction (UP, DOWN, RIGHT, LEFT) where the player is going
 *
 */
function Character(url, x, y, direction) {
    //case number
    this.x = x;
    this.y = y;
    this.direction = direction;
    //define the state of the animation : < 0 --> not moving // > 0 --> moving (represent the step in the animation)
    this.animationState = -1;

    this.image = new Image();
    this.image.characterReference = this;

    this.image.onload = function () {
        if (!this.complete) {
            console.error("Error loading image");
        }
        this.characterReference.width = this.width / 4;
        this.characterReference.height = this.height / 8;
    };

    this.image.src = "sprites/" + url;
}

/**
 * Prototype Function
 */

/**
 * Draw a character
 * @param context
 *      The context where we are drawing
 */
Character.prototype.drawCharacter = function (context) {
    var frame = 0;
    var offsetX = 0;
    var offsetY = 0;

    if (this.animationState >= MOVE_DURATION) {
        this.animationState = -1;
    } else if (this.animationState >= 0) {
        frame = this.animationState % ANIMATION_DURATION;

        var remainingPixel = 32 - (32 * (this.animationState / MOVE_DURATION));

        switch (this.direction) {
            case ORIENTATION.UP :
                offsetY = remainingPixel;
                break;
            case ORIENTATION.DOWN :
                offsetY = -remainingPixel;
                break;
            case ORIENTATION.LEFT :
                offsetX = remainingPixel;
                break;
            case ORIENTATION.RIGHT :
                offsetX = -remainingPixel;
                break;
        }

        this.animationState++;
    }

    //store computed data for visibility
    // origin of source rectangle to take in our image
    var drawOriginX = this.width * frame;
    var drawOriginY = this.direction * this.height;
    var destinationX = (this.x * 32) - (this.width / 2) + 16;
    var destinationY = (this.y * 32) - this.height + 24;

    //Clear the previous position
    //add -2 to offsetY and 3 to this.height because if not there is a remaining of drawing that is not deleted
    context.clearRect(
        destinationX + offsetX,
        destinationY + offsetY - 3,
        this.width,
        this.height + 5);

    //Draw the new position
    context.drawImage(
        this.image,
        drawOriginX, drawOriginY,
        this.width, this.height,
        destinationX + offsetX, destinationY + offsetY,
        this.width, this.height
    );
};

/**
 * Retrieve the adjacent cell to the current one function of the direction
 * @param direction
 *      The direction where the player is going
 * @returns {{x: *, y: *}}
 */
Character.prototype.getAdjacentCoordinate = function (direction) {
    var coord = {
        "x": this.x,
        "y": this.y
    };

    switch (direction) {
        case ORIENTATION.DOWN :
            coord.y++;
            break;
        case ORIENTATION.UP :
            coord.y--;
            break;
        case ORIENTATION.LEFT :
            coord.x--;
            break;
        case ORIENTATION.RIGHT :
            coord.x++;
            break;
    }
    return coord;
};

Character.prototype.move = function (direction, map) {
    if (this.animationState >= 0) {
        return false;
    }
    //change character orientation
    this.direction = direction;

    //check if the adjacent case is in the map (ie coordinate >0 or coordinate > map size)
    var nextCase = this.getAdjacentCoordinate(direction);
    if (nextCase.x < 0 || nextCase.y < 0 || nextCase.x >= map.getWidth() || nextCase.y >= map.getHeight()) {
        return false;
    }

    //begin animation
    this.animationState = 1;

    //Make the move
    this.x = nextCase.x;
    this.y = nextCase.y;

    return true;

};