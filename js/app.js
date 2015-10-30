// canvas
var canvasWidth = 505;
var canvasHeight = 606;

// grid vars
var titleWidth = 101;
var titleHeight = 86;
var xMax = 4;
var yMax = 5;

// player vars
var playerYOffset = -50;
var playerYStart = 5;
var playerXStart = 2;
var playerSidePadding = 20;

// enemy vars
var enemyYOffset = -32;
var enemyWidth = 101;
var enemyXStart = 0 - enemyWidth;


// Enemies our player must avoid.
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if(this.x > canvasWidth) {
        this.reset();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * titleHeight + enemyYOffset);
};
Enemy.prototype.reset = function() {
    this.x = enemyXStart;
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
    ctx.drawImage(Resources.get(this.sprite), this.x * titleWidth, this.y * titleHeight + playerYOffset);
};
Player.prototype.update = function(dt) {
    allEnemies.forEach(function(enemy) {
        if (player.isHit(enemy)) {
            player.reset();
        }
    });
};
Player.prototype.handleInput = function(direction) {

    switch(direction) {
        case 'left':
            this.x--;
            break;
        case 'up':
            this.y--;
            break;
        case 'right':
            this.x++;
            break;
        case 'down':
            this.y++;
            break;
    }

    if (this.y == 0 || this.y > yMax || this.x < 0 || this.x > xMax) {
        this.reset();
    }
};
Player.prototype.reset = function() {
    this.x = playerXStart;
    this.y = playerYStart;
};
Player.prototype.isHit = function(enemy) {
    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemyWidth;
    var playerLeft = this.x * titleWidth + playerSidePadding;
    var playerRight = this.x * titleWidth + titleWidth - playerSidePadding;

    return (enemy.y == player.y) && !(enemyRight < playerLeft || enemyLeft > playerRight);
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