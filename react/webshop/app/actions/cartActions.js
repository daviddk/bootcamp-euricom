import appDispatcher from '../appDispatcher';

var cartActions = {
    add: function(item) {
        appDispatcher.handleAction({
            actionType: 'ADD_TO_CART',
            data: item
        });
    },
    delete: function(item) {
        appDispatcher.handleAction({
            actionType: 'DEL_FROM_CART',
            data: item
        });
    }
}

export default cartActions;
