
function Speedmeter(jesus) {
    this.jesus = jesus;

    this.lastLeg = "right";
    this.count = 0;
    this.expected = 1;

}
Speedmeter.prototype.getSpeed = function() {
    return this.jesus.getSpeed();
}

Speedmeter.prototype.leftLeg = function() {
    if (this.lastLeg === "left") {
        this.count--;
        return;
    }
    this.lastLeg = "left";

    this.count++;

}


Speedmeter.prototype.rightLeg = function() {
    if (this.lastLeg === "right") {
        this.count--
        return;
    }
    this.lastLeg = "right";
}

Speedmeter.prototype.tick = function() {

    var plus = this.count - this.expected;
    if (plus > 0) {
        console.log("accelerating jesus by " + plus);

        this.jesus.accelerate(plus);
    }

    this.count = 0;
}


function Engine(game, speedmeter) {
    this.game = game;
    this.speedmeter = speedmeter;


}

Engine.prototype.tick = function() {

    this.game.moveJesusByItsSpeed();

}


function DoItLikeJesus() {


    this.speedCheckTimer = new Timer(1000);
    this.moveJesusTimer = new Timer(10);


    this.jesus = new Jesus();
    this.game = new Game(this.jesus, Level_1);
    this.speedmeter = new Speedmeter(this.jesus);

    this.engine = new Engine(this.game, this.speedmeter, this.timer);

    this.game.start();

    this.view = new GameView(this.game, "viewcontainer");


    var self = this;

    this.moveJesusTimer.addEventListener(TimerEvent.TIMER, function(e)
    {
        self.engine.tick();
        self.view.render();
    });

    this.speedCheckTimer.addEventListener(TimerEvent.TIMER, function(e)
    {
        self.speedmeter.tick();
    });

    this.view.render();


    document.addEventListener('keyup', function (e){
        if (e.keyCode === 65) {
            self.speedmeter.leftLeg();
        } else if (e.keyCode === 68) {
            self.speedmeter.rightLeg();
        }
    }, false);


    this.speedCheckTimer.start();
    this.moveJesusTimer.start();



}