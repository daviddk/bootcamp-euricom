describe('calculate service', () => {
    describe('adding', () => {
        it("should return 2 for 1+1", () => {
            var result = calc.add("100", "300");
            expect(result).toBe(400);
        });

        it("should return 400 for 100+300", () => {
            var result = calc.add("100", "300");
            expect(result).toBe(400);
        });

        it("should return 10 for -10+20", () => {
            var result = calc.add(-10, 20);
            expect(result).toBe(10);
        });

        it("should return 20 for 20+..", () => {
            var result = calc.add(20);
            expect(result).toBe(20);
        });

        it("should return 100 for 10*10", () => {
            var result = calc.mul(10, 10);
            expect(result).toBe(100);
        });

        beforeEach(() => {
            console.log('test');
        });
        afterEach(() => {
            console.log('test2');
        });
    });
});
