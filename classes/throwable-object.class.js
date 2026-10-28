class ThrowableObject extends MovableObject {
    speedY = 0;
    speed = 0;
    IMAGES_FLYING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    isBroken = false;
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    isGone = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_FLYING_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 65;
        this.throw();
        this.animate();
        this.loadImages(['img/6_salsa_bottle/1_salsa_bottle_on_ground.png']);
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            if (this.isInAir()) {
                this.x += 5;
            } else if (!this.isBroken) {
                this.hasLanded = true;
            }
        }, 25);
    }

    splash() {
        this.isBroken = true;
        this.currentImage = 0;
        clearInterval(this.moveInterval);
    }

    animate() {
        setInterval(() => {
            if (this.isBroken) {
                if (this.currentImage < this.IMAGES_SPLASH.length) {
                    this.playAnimation(this.IMAGES_SPLASH);
                } else {
                    this.isGone = true;
                }
            } else if (this.isInAir()) {
                this.playAnimation(this.IMAGES_FLYING_BOTTLE);
            } else {
                this.hasLanded = true;
            }

        }, 200);
    }

    isInAir() {
        return this.y < 350;
    }
}