'use strict'
require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'domready': 'bower_components/requirejs-domready/domready'
    }
})

require(['jquery', 'domready', './mod'], function($, domReady, mod) {
    domReady(function() {
        console.log(mod["mul"](2, 3));
    });
});

//commonJS
/*var mod = require('./mod');
mod.action();*/
