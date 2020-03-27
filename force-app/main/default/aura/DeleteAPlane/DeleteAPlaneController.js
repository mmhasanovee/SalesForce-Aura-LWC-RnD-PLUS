({
    doInit: function (component, event, helper) {

        //Step 1
        var action = component.get('c.getPlaneList');
        //returns objects of action class
        //get can be used to fecth object of action class

        //this is optional
        //
        //Stemp 2, though optional
        action.setParams({

            accountId: component.get('v.recordId'),
        });


        //Step 4, create callback after the server side action returns..
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.planeList', responseValue);
        }, 'SUCCESS');

        //Step 3
        $A.enqueueAction(action, false);
        //dont want to run in the background
        //enqueueAction(action) adds the server-side controller action to the queue of actions to be executed. All actions that are enqueued will run at the end of the event loop.


    },

    doDelete: function (component, event, helper) {

        var eventSource = event.getSource(); //get the event from the button
        var idToDelete = eventSource.get('v.value'); //initialized the id to the value of the button, and fetching it by v.value...

        var idToDelete2 = "'" + idToDelete + "'";
        console.log(idToDelete);
        var action = component.get('c.delPlane'); //getting the method from PlaneListXController
        action.setParams({
            searchID: idToDelete //passing the id as string parameter to the class you got.
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been deleted successfully."
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            } else {
                console.log(response.getError());
            }

        });

        $A.enqueueAction(action);

    }

})