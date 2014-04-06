
function Jesus() {
    this.name = "Jesus";
    this.position = 0;
    this.speed = 0;
    this.isOnRunnableGround = true;
}

Jesus.prototype.getCurrentPosition = function() {
    return this.position;
}

Jesus.prototype.setIsOnRunnableGround = function(val) {
    this.isOnRunnableGround = val;
}

Jesus.prototype.getSpeed = function() {
    return this.speed;
}

Jesus.prototype.move = function(by) {
    return this.position += by;
}

Jesus.prototype.accelerate = function(by) {
    if (this.isOnRunnableGround) {
        this.speed = this.speed + by;

    }
}

Jesus.prototype.decelerate = function(by) {
    this.speed = this.speed + (-1* by);
}

function Game(jesus, level) {
    this.jesus = jesus;
    this.level = level;
    this.running = false;
    this.lost = false;
}


Game.prototype.start = function() {
    this.running = true;
}
Game.prototype.isRunning = function() {
    return this.running;
}

Game.prototype.getCurrentSection = function() {
    var currentpos = this.jesus.getCurrentPosition();
    var section = this.level.getSectionAt(currentpos);

    return section;
}

Game.prototype.getRemainingLengthForCurrentSection= function() {
    var currentpos = this.jesus.getCurrentPosition();
    var section = this.level.getRemainingLengthForSectionAtPosition(currentpos);

    return section;
}

Game.prototype.isWon = function() {
    if (this.lost) {
        return false;
    }
    var sec = this.getCurrentSection();

    if (sec.type.type == "goal") {
        return true;
    }
    return false;
}

Game.prototype.isLost = function() {
    return this.lost;
}

Game.prototype.moveJesus = function(speed) {
    if (!this.isRunning()) {
        return;
    }


    var section = this.getCurrentSection();

    if (section == null) {
        throw "jesus behind sections";
    }

    if (speed < 0.1) {
        if (section.isStandable()) {
            return
        } else {
            this.lost = true;
        }
    }

    var remaining = this.getRemainingLengthForCurrentSection();
    var reststeps = 0;
    var walkingsteps = 0;
    if (speed > remaining) {
        reststeps = speed - remaining;
        walkingsteps = remaining;
    } else {
        reststeps = 0;
        walkingsteps = speed;
    }



    var cost = walkingsteps * section.getCost();
    this.jesus.decelerate(cost);
    this.jesus.move(walkingsteps);

    this.jesus.setIsOnRunnableGround(section.isRunnable());

    if (this.isLost() || this.isWon()) {
        alert("game done");
        this.running = false;
    }


    if (reststeps > 0) {
        this.moveJesus(reststeps);
    }

}


Game.prototype.moveJesusByItsSpeed = function() {
    return this.moveJesus(this.jesus.getSpeed() / 10);

}

function GameView(game, element) {
    this.game = game;
    this.el = document.getElementById(element);

}
GameView.prototype.render = function() {

    var sections = this.game.level.sections;
    var pos = 0;
    var jesusPos = Math.floor(this.game.jesus.getCurrentPosition());

    var jesus = "";
    var map = "";
    for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        for (var j = 0; j < sec.getLength(); j++) {
            if (pos === jesusPos) {
                jesus = jesus + "J";
            } else {
                jesus = jesus + " ";
            }

            if (sec.type.type == "water") {
                map = map + "W";
            } else if (sec.type.type === "sand") {
                map = map +  "S";
            } else {
                map = map + "?";
            }

            pos++;
        }
    }

    var info = this.game.isWon() ? "Spiel gewonnen!" : this.game.isLost() ? "Spiel verloren" : "Spiel läuft!";
    info = info + "<br />Jesus speed: " + this.game.jesus.speed + "\n";
    this.el.innerHTML = "<p>" + info + "</p><pre style='font-size: 0.4em;'>"+  "\n" + jesus+ "\n" + map  + "</pre>";
}
