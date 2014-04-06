describe("Game", function() {
  var level;
  var game;
  var sandsection = new Section(new Sand(), 100);
  var watersection = new Section(new Water(), 100);


  beforeEach(function() {
    level = new Level([sandsection,watersection]);
    jesus = new Jesus();
    game = new Game(jesus, level);
  });

    it("is not running by default", function() {
        expect(game.isRunning()).toBeFalsy();
    });

    it("can be started", function() {
        game.start();
        expect(game.isRunning()).toBeTruthy();
    });

    it("can move Jesus on sand", function() {

        var positionBeforeMove = jesus.getCurrentPosition();

        game.moveJesus(10);

        expect(jesus.getCurrentPosition()).toBeGreaterThan(positionBeforeMove);
    });


    describe("Jesus", function() {
        it("starts at position 0", function() {
            expect(jesus.getCurrentPosition()).toBe(0);
        })

        it("can be moved by positive step", function() {
            var pos = jesus.getCurrentPosition();
            jesus.move(10);
            expect(jesus.getCurrentPosition()).toBe(pos + 10);
        })

        it("can be moved by positive step twice", function() {
            var pos = jesus.getCurrentPosition();

            jesus.move(10);
            jesus.move(10);
            expect(jesus.getCurrentPosition()).toBe(pos + (2*10));
        });

        it("starts at speed 0", function() {
            expect(jesus.getSpeed()).toBe(0);
        });

        it("can be accellerated", function() {
            jesus.accelerate(10);
            expect(jesus.getSpeed()).toBe(10);
        });

        it("can be accelerated twice", function() {
            jesus.accelerate(10);
            jesus.accelerate(10);

            expect(jesus.getSpeed()).toBe(2*10);
        });




    });

    describe("Jesus' movement", function() {



        xit("cannot move Jesus on water", function() {
            jesus.move(sandsection.getLength() + 10); // jesus stands on water now
            var jesusOnWater = jesus.getCurrentPosition();

            game.moveJesus(100);

            expect(jesus.getCurrentPosition()).toBe(jesusOnWater);
        });

        xit("moves Jesus by runfactor of section", function() {

            spyOn(sandsection, "getRunFactor").and.returnValue(0.5);

            game.moveJesus(12); // jesus stands on water now

            expect(jesus.getCurrentPosition()).toBe(12 * 0.5);
        });

        it("detects jesus' death", function() {
            game.moveJesus(100);

            expect(game.isLost()).toBeFalsy();

            game.moveJesus(0);

            expect(game.isLost()).toBeTruthy();


        });




    });




});
