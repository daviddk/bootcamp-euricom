class Calc {
    add(x, y) {
        if(!x) {
            return y*1;
        }

        if(!y) {
            return x*1;
        }
        return x*1 + y*1;
    }

    mul(x, y) {
        return x*1 * y*1;
    }
}

var calc = new Calc();
