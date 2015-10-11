describe('util services', function() {
    describe('uuid', function() {
        it("should return false for comparing 2 newly created IDs", function() {
            var uuid1 = util.uuid();
            var uuid2 = util.uuid();
            expect(uuid1 === uuid2).toBe(false);
        });
    })

    describe('pluralize', function() {
        it("should return tests for test", function() {
            var result = util.pluralize(4, 'test');
            expect(result).toBe('tests');
        });
    });
});
