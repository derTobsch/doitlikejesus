function Sand() {
    this.type = "sand";
    this.runnable = true;
    this.standable = true;

    this.runfactor = 1;
    this.cost = 0.1;
}
function Water() {
    this.type = "water";
    this.runnable = false;
    this.standable = false;
    this.cost = 1;


}

function Goal() {
    this.type = "goal";
    this.runnable = false;
    this.standable = true;
    this.cost = 10;


}

function Section(type, length) {
    this.type = type;
    this.len = length;

}
Section.prototype.getLength = function() {
    return this.len;
}

Section.prototype.getCost = function() {
    return this.type.cost;
}

Section.prototype.isRunnable = function() {
    return this.type.runnable;
}


Section.prototype.isStandable = function() {
    return this.type.standable;
}

Section.prototype.getRunFactor = function() {
    return this.type.runfactor || 0;
}

function Level(section) {
    this.sections = section;

}
Level.prototype.getSectionAt = function(position) {
    var startOfSection = 0;
    for (var i = 0; i < this.sections.length; i++) {
        var sec = this.sections[i];

        var endOfSection = startOfSection + sec.getLength();

        if (position >= startOfSection && position < endOfSection) {
            return sec;
        }
        startOfSection = endOfSection;

    }

    return null;

};

Level.prototype.getRemainingLengthForSectionAtPosition = function(position) {
    var startOfSection = 0;
    for (var i = 0; i < this.sections.length; i++) {
        var sec = this.sections[i];

        var endOfSection = startOfSection + sec.getLength();

        if (position >= startOfSection && position < endOfSection) {
            return endOfSection - position;
        }
        startOfSection = endOfSection;

    }

    return null;
}




var Level_1 = new Level([new Section(new Sand(), 300), new Section(new Water(), 25),new Section(new Goal(), 100)]);