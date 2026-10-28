class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbarHealth = new Statusbar('health', 0);
    statusbarCoin = new Statusbar('coin', 45);
    statusbarBottle = new Statusbar('bottle', 90);
    bottles = [
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle'),
        new Collectables('bottle')
    ];
    coins = [
        new Collectables('coin'),
        new Collectables('coin'),
        new Collectables('coin'),
        new Collectables('coin'),
        new Collectables('coin'),
        new Collectables('coin')
    ];
    throwableObjects = [];
    drawableObject = new DrawableObject();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollection(this.bottles, this.statusbarBottle);
            this.checkCollection(this.coins, this.statusbarCoin);
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusbarBottle.amount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusbarBottle.amount -= 20;
            this.statusbarBottle.setPercentage(this.statusbarBottle.amount);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkCollection(items, statusbar) {
        items.forEach((item, index) => {
            if (this.character.isColliding(item) && statusbar.amount < 100) {
                statusbar.isCollected();
                statusbar.setPercentage(statusbar.amount);
                items.splice(index, 1);
            }
        });
    }

    // draw() wird immer wieder ausgeführt
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // space for fixed objects
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}