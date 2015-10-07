var calc = (function() {
    'use strict'

    function add(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;
    }

    return {
        add: add,
        mul: mul
    }
})();
