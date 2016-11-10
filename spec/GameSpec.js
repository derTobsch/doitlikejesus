describe("Game", function () {
    var level;
    var game;
    var sandsection = new Section(new Sand(), 100);
    var watersection = new Section(new Water(), 100);
    var goal = new Section(new Goal(), 100);

    beforeEach(function () {
        level = new Level([sandsection, watersection, goal]);
        jesus = new Jesus();
        game = new Game(jesus, level);
    });

    it("is not running by default", function () {
        expect(game.isRunning()).toBeFalsy();
    });

    it("can be started", function () {
        game.start();
        expect(game.isRunning()).toBeTruthy();
    });

    it("can move Jesus on sand", function () {
        game.start();

        var positionBeforeMove = jesus.getCurrentPosition();

        game.moveJesus(100);

        expect(jesus.getCurrentPosition()).toBeGreaterThan(positionBeforeMove);
    });


    it("detects jesus' death", function () {
        game.start();

        game.moveJesus(100);

        expect(game.isLost()).toBeFalsy();

        game.moveJesus(0);

        expect(game.isLost()).toBeTruthy();
    });

    it("detects jesus' win", function () {
        game.start();

        game.moveJesus(10);

        expect(game.isWon()).toBeFalsy();

        game.moveJesus(1010);

        expect(game.isWon()).toBeTruthy();
    });

    it("movement of jesus over sand decreases speed", function () {
        game.start();

        jesus.accelerate(100);
        var speedBefore = jesus.getSpeed();
        game.moveJesus(10);

        expect(jesus.getSpeed()).toBeLessThan(speedBefore);
    });

    describe("Jesus", function () {
        it("starts at position 0", function () {
            expect(jesus.getCurrentPosition()).toBe(0);
        });

        it("can be moved by positive step", function () {
            var pos = jesus.getCurrentPosition();
            jesus.move(10);
            expect(jesus.getCurrentPosition()).toBe(pos + 10);
        });

        it("can be moved by positive step twice", function () {
            var pos = jesus.getCurrentPosition();

            jesus.move(10);
            jesus.move(10);
            expect(jesus.getCurrentPosition()).toBe(pos + (2 * 10));
        });

        it("starts at speed 0", function () {
            expect(jesus.getSpeed()).toBe(0);
        });

        it("can be accellerated", function () {
            jesus.accelerate(10);
            expect(jesus.getSpeed()).toBe(10);
        });

        it("can be accelerated twice", function () {
            jesus.accelerate(10);
            jesus.accelerate(10);

            expect(jesus.getSpeed()).toBe(2 * 10);
        });
    });
});
