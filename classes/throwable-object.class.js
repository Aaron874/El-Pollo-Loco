class ThrowableObject extends MovableObject {
    speedY = 0;
    speed = 0;
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 65;
        this.throw();
    }

    throw() {
            this.speedY = 20;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
    }
}