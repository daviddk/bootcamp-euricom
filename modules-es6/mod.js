/*commonJS
module.exports = 'aaa'
module.exports.foo = function() {}*/

class Calc {
    add(x, y) {
        return x + y;
    }

    mul(x, y) {
        return x * y;
    }
}

class Car {
    start() {
        console.log('start');
    }
}

//ES6
var calc = new Calc();

export{calc, Car};
/*export var foo = function() {
    console.log('hello');
}
*/
