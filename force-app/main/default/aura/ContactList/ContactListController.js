({
    doInit: function (component, event, helper) {

        //Step 1
        var action = component.get('c.getContactList');
        //returns objects of action class
        //get can be used to fecth object of action class

        //this is optional
        //
        //Stemp 2, though optional

        //alert(component.get('v.recordId'));
        action.setParams({

            accountId: component.get('v.recordId'),
        });


        //Step 4, create callback after the server side action returns..
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.contactList', responseValue);
        }, 'SUCCESS');

        //Step 3
        $A.enqueueAction(action, false);
        //dont want to run in the background
        //enqueueAction(action) adds the server-side controller action to the queue of actions to be executed. All actions that are enqueued will run at the end of the event loop.


    },
    doRedirect: function (component, event, helper) {
        var eventSource = event.getSource();
        var id = eventSource.get('v.name');


        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": id,
            "slideDevName": "detail"
        });
        navEvt.fire();

    },

    handleCompEvent: function (component, event, helper) {

        var availableContact = component.get('v.contactList');
        var ContactRecord = event.getParam('ContactRecord');
        console.log(ContactRecord);
        availableContact.push(ContactRecord);
        component.set('v.contactList', availableContact);
    }
})