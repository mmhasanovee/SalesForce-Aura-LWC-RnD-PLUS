({
    doInit: function (component, event, helper) {
        var action = component.get('c.getPaanListOfAll');
        console.log('working');
        $A.enqueueAction(action, false);
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.paanList', responseValue);
        }, 'SUCCESS');

    },

})