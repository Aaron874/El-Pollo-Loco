class NewScreen extends DrawableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.ctx = canvas.getContext('2d');
        this.y = 480 - this.height;
        this.x = x;
    }
}