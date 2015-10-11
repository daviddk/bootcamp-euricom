describe('to do service', function() {
    describe('add an item', function() {
        beforeEach(function() {
            todoRepo.init();
        });
        it("should return 1", function() {
            todoRepo.add('abc');
            var todos = todoRepo.getList();
            expect(todos.length).toBe(1);

            expect(todos[0].title).toBe('abc');

            expect(todoRepo.getList().length).toBe(1);
        });
    });

    describe('added an item and removed it', function() {
        beforeEach(function() {
            todoRepo.init();
        });
        it("should return 0", function() {
            todoRepo.add('abc');
            todoRepo.remove(0);
            var todos = todoRepo.getList();
            expect(todos.length).toBe(0);
        });
    });
});
