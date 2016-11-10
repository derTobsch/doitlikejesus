describe("Level", function () {
    var level;
    var sections;
    var sandsection = new Section(new Sand(), 100);
    var watersection = new Section(new Water(), 100);


    beforeEach(function () {
        sections = [sandsection, watersection];

        level = new Level(sections);
    });

    it("finds sand section", function () {
        var sec = level.getSectionAt(10);
        expect(sec).toBe(sandsection);
    });

    it("finds water section", function () {
        var sec = level.getSectionAt(101);
        expect(sec).toBe(watersection);
    });

    it("calculates end correct from start", function () {
        var remaining = level.getRemainingLengthForSectionAtPosition(0);
        expect(remaining).toBe(100);
    });

    it("calculates end correct from middle", function () {
        var remaining = level.getRemainingLengthForSectionAtPosition(50);
        expect(remaining).toBe(100 - 50);
    });

    it("calculates end correct from end", function () {
        var remaining = level.getRemainingLengthForSectionAtPosition(99);
        expect(remaining).toBe(100 - 99);
    });

    it("calculates end correct from start at second section", function () {
        var remaining = level.getRemainingLengthForSectionAtPosition(100);
        expect(remaining).toBe(100);
    });

    it("finds nothing after end of sections", function () {
        var sec = level.getSectionAt(201);
        expect(sec).toBeNull()
    });

    describe("Water", function () {

        var watersection = new Section(new Water(), 100);

        it("is not standable", function () {
            expect(watersection.isStandable()).toBeFalsy();
        });

        it("is not runable", function () {
            expect(watersection.isRunnable()).toBeFalsy();
        });

        it("has zero runfactor", function () {
            expect(watersection.getRunFactor()).toBe(0);
        });

        it("has high cost", function () {
            expect(watersection.getCost()).toBeGreaterThan(0.5);
        });

        it("has higher cost than sand", function () {
            expect(watersection.getCost()).toBeGreaterThan(sandsection.getCost());
        });
    });

    describe("Sand", function () {
        var sandsection = new Section(new Sand(), 100);

        it("is standable", function () {
            expect(sandsection.isStandable()).toBeTruthy();
        });

        it("is runable", function () {
            expect(sandsection.isStandable()).toBeTruthy();
        });

        it("has a runfactor", function () {
            expect(sandsection.getRunFactor()).toBeGreaterThan(0);
        });

        it("has low cost", function () {
            expect(sandsection.getCost()).toBeLessThan(0.2);
        });
    });
});
