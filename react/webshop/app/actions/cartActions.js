import appDispatcher from '../appDispatcher';

var cartActions = {
    add: function(itemid) {
        appDispatcher.handleAction({
            actionType: 'ADD_TO_CART',
            data: itemid
        });
    }
}

export default cartActions;
