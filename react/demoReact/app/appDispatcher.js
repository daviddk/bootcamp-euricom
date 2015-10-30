var Dispatcher = require('flux').Dispatcher;
var appDispatcher = new Dispatcher();

appDispatcher.handleAction = function(action) {
    this.dispatch({
        action: action
    });
};

module.exports = appDispatcher;
