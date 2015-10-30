//var Dispatcher = require('flux').Dispatcher;
import {Dispatcher} from 'flux';
var appDispatcher = new Dispatcher();

appDispatcher.handleAction = function(action) {
    this.dispatch({
        action: action
    });
};

export default appDispatcher;
