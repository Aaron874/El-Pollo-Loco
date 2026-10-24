class Collectables extends DrawableObject {
    y = 350;
    height = 80;
    width = 50;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        let index = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[index]);
        this.x = 200 + Math.random() * 2850;
    }
}