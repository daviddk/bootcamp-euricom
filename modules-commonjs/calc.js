'use strict'

//old
/*module.exports.calculate = function(cmd, x, y) {
    if(cmd === 'add') {
        return x + y;
    }
    else if(cmd === 'mul') {
        return x * y;
    }
}
*/

class Calc {
    add(x, y) {
        return x + y;
    }

    mul(x, y) {
        return x * y;
    }
}

module.exports = new Calc();
