({
    doInit: function (component, event, helper) {
        var action = component.get('c.getPlaneList');
        $A.enqueueAction(action, false);
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.planeList', responseValue);
        }, 'SUCCESS');

    },

    //Step 1
    //returns objects of action class
    //get can be used to fecth object of action class

    //this is optional
    //
    //Stemp 2, though optional
    //Step 3
    //dont want to run in the background
    //enqueueAction(action) adds the server-side controller action to the queue of actions to be executed. All actions that are enqueued will run at the end of the event loop.

    //Step 4, create callback after the server side action returns..


    doUpdate: function (component, event, helper) {
        var pageReference = component.find("navigation"); //finding component via the aura id
        var pageReferenceNav = {
            "type": "standard__component",
            "attributes": {
                "componentName": "c__UpdatePlaneDetails"
            },
            "state": {
                "c__planeId": event.getSource().get("v.name")
                // "c__beerName":component.get('v.beerName')
            }
        };
        var alertBeerid = component.get('v.beerName');

        pageReference.navigate(pageReferenceNav);
        //navigate to navigation from overlay.cmp and forward the object created in here
    }

})