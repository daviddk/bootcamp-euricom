var appDispatcher = require('../appDispatcher.js');

var employeeActions = {
    addEmployee: function(employee) {
        appDispatcher.handleAction({
            actionType: 'ADD_EMPLOYEE',
            data: employee
        });
    }
};

module.exports = employeeActions;
