function JesusView() {

    var jesusTexture = PIXI.Texture.fromImage("jesus.png");
    PIXI.Sprite.call(this, jesusTexture);
    this.position.x = 0;
    this.position.y = 400 - 40 -  jesusTexture.height;

}
JesusView.constructor = JesusView;
JesusView.prototype = Object.create(PIXI.Sprite.prototype);




function LandscapeView(name, length, pos) {

    this.pos = pos;

    var sandTexture = PIXI.Texture.fromImage(name + ".png");
    PIXI.Sprite.call(this, sandTexture);
    this.position.x = pos;
    this.position.y = 400 - 50;
    this.width= length;
}
LandscapeView.constructor = LandscapeView;
LandscapeView.prototype = Object.create(PIXI.Sprite.prototype);

LandscapeView.prototype.moveTo = function(x) {
    this.position.x = this.pos - x;
}