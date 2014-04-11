function LevelSection(type) {
    this.width = 100;

    this.type = type;
    this.sprite = null;
}

function LevelView(stage, dlj, stagewidth) {
    this.stage = stage;
    this.dlj = dlj;
    this.stagewidth = stagewidth;
    this.stagewidthInX = stagewidth / new LevelSection().width;

    this.pool = new SpritePool(this.stagewidthInX + 2, ["water", "sand"]);


    this.initializeSectionViews(dlj.game.level.sections);

    this.jesusView = new JesusView();
    this.stage.addChild(this.jesusView);
}

LevelView.prototype.initializeSectionViews = function(sections) {

    this.sectionViews = [];

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var type = "sand";
        if (section.type.type == "water") {
            type = "water";

        }
        for (var j = 0; j < section.getLength(); j++) {
            var sectionView = new LevelSection(type);
            this.sectionViews.push(sectionView);

        }

    }

}

LevelView.prototype.update = function() {
    var x = this.dlj.jesus.getCurrentPosition();

    var startSection = Math.floor(x);
    var rest = x - startSection;

    var endSection = startSection + this.stagewidthInX;

    for (var i = 0; i < this.sectionViews.length; i++) {
        var section = this.sectionViews[i];
        if (i < startSection) {
            if (section.sprite != null) {
                console.log("hiding sprite " + i);
                this.stage.removeChild(section.sprite);
                this.pool.returnSprite(section.type, section.sprite);
                section.sprite = null;
            }

        } else if (i < endSection+1) {

            var pos = (i - x) * section.width;
            if (section.sprite == null) {
                console.log("creating sprite " + i);
                section.sprite = this.pool.borrowSprite(section.type);


                this.stage.addChild(section.sprite);
            }
            section.sprite.moveTo(pos);


        } else if (i > endSection) {
            break;
        }

    }


}



function SpritePool(count, items) {
    this.items = [];

    for (var j = 0; j < items.length; j++) {
        var type = items[j];
        this.items[type] = [];


        for (var i = 0; i < count; i++) {
            this.items[type][i] = new LandscapeView(type);
;        }


    }


}

SpritePool.prototype.returnSprite = function(type, sprite) {
    return this.items[type].push(sprite);
}

SpritePool.prototype.borrowSprite = function(type) {
    return this.items[type].shift();
}


function JesusView() {

    var jesusTexture = PIXI.Texture.fromImage("jesus.png");
    PIXI.Sprite.call(this, jesusTexture);
    this.position.x = 0;
    this.position.y = 400 - 40 -  jesusTexture.height;

}
JesusView.constructor = JesusView;
JesusView.prototype = Object.create(PIXI.Sprite.prototype);




function LandscapeView(name, length) {

    var texture = PIXI.Texture.fromImage(name + ".png");
    PIXI.Sprite.call(this, texture);
    this.position.x = 42;
    this.position.y = 400 - 50;
    this.width= 100;
}
LandscapeView.constructor = LandscapeView;
LandscapeView.prototype = Object.create(PIXI.Sprite.prototype);

LandscapeView.prototype.moveTo = function(x) {
    this.position.x = x;
}