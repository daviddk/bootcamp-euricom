'use strict'

var calc = require('./calc');
var argv = require('yargs').argv;

var actionName = argv.fn;
var result = calc[actionName](argv.val1, argv.val2);
console.log(result);

/*
var result = 0;
if (argv.cmd == 'add')
    result = calc.add(argv.val1,argv.val2)
else if (argv.cmd == 'mul')
    result = calc.add(argv.val1,argv.val2)*/

