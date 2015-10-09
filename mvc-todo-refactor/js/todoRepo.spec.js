describe('to do service', function() {
    beforeEach(function() {
        todoRepo.init();
    });

    describe('add an item', function() {
        it("should return 1", function() {
            todoRepo.add('abc');
            var todos = todoRepo.getList();
            expect(todos.length).toBe(1);

            expect(todos[0].title).toBe('abc');
        });
    });

    describe('added an item and removed it', function() {
        it("should return 0", function() {
            todoRepo.add('abc');
            var todos = todoRepo.getList();
            todoRepo.remove();
            expect(todos.length).toBe(0);
        });
    });
});
