describe("Engine", function () {
    var game;
    var engine;
    var speedmeter;


    beforeEach(function () {
        var level = Level_1;
        var jesus = new Jesus();
        game = new Game(jesus, level);

        var timer = new Timer();
        speedmeter = new Speedmeter(jesus);

        engine = new Engine(game, speedmeter, timer);

        timer.start();
    });

    it("exists", function () {
        expect(engine).toBeDefined();
    });

    it("tick triggers speedmeter", function () {
        engine.tick();
        //expect(engine).toBeDefined();
    });

    describe("Speedmeter", function () {
        var speedmeter = new Speedmeter(new Jesus());
        it("returns a speed", function () {
            for (var i = 0; i < 10; i++) {
                speedmeter.leftLeg();
                speedmeter.rightLeg();
            }
            speedmeter.tick();
            expect(speedmeter.getSpeed()).toBeGreaterThan(0);
        });
    });
});
