'use strict';

// canvas
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;

// grid vars
var TILE_WIDTH = 101;
var TILE_HEIGHT = 86;
var X_MAX = 4;
var Y_MAX = 5;

// player vars
var PLAYER_Y_OFFSET = -50;
var PLAYER_Y_START = 5;
var PLAYER_X_START = 2;
var PLAYER_SIDE_PADDING = 20;

// enemy vars
var ENEMY_Y_OFFSET = -32;
var ENEMY_WIDTH = 101;
var ENEMY_X_START = 0 - ENEMY_WIDTH;


// Enemies our player must avoid.
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if(this.x > CANVAS_WIDTH) {
        this.reset();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * TILE_HEIGHT + ENEMY_Y_OFFSET);
};
Enemy.prototype.reset = function() {
    this.x = ENEMY_X_START;
    this.updateLane();
    this.updateSpeed();
};
Enemy.prototype.updateSpeed = function() {
    this.speed = Math.floor(Math.random() * 200) + 100;
};
Enemy.prototype.updateLane = function() {
    this.y = Math.floor(Math.random() * 3) + 1;
};

// player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * TILE_WIDTH, this.y * TILE_HEIGHT + PLAYER_Y_OFFSET);
};
Player.prototype.update = function(dt) {
    var self = this;
    allEnemies.forEach(function(enemy) {
        if (self.isHit(enemy)) {
            self.reset();
        }
    });
};
Player.prototype.handleInput = function(direction) {

    switch(direction) {
        case 'left':
            if (this.isValidMove(this.x - 1, this.y)) {
                this.x--;
            }
            break;
        case 'up':
            if (this.isValidMove(this.x, this.y - 1)) {
                this.y--;
            }
            break;
        case 'right':
            if (this.isValidMove(this.x + 1, this.y)) {
                this.x++;
            }
            break;
        case 'down':
            if (this.isValidMove(this.x, this.y + 1)) {
                this.y++;
            }
            break;
    }

    if (this.y == 0) {
        this.reset();
        console.log("You Win!");
    }
};
Player.prototype.reset = function() {
    this.x = PLAYER_X_START;
    this.y = PLAYER_Y_START;
};
Player.prototype.isHit = function(enemy) {
    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + ENEMY_WIDTH;
    var playerLeft = this.x * TILE_WIDTH + PLAYER_SIDE_PADDING;
    var playerRight = this.x * TILE_WIDTH + TILE_WIDTH - PLAYER_SIDE_PADDING;

    return (enemy.y == player.y) && !(enemyRight < playerLeft || enemyLeft > playerRight);
};
Player.prototype.isValidMove = function(x, y) {
    return y >= 0 && y <= Y_MAX && x >=0 && x <= X_MAX;
};

// Now instantiate your objects.
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});