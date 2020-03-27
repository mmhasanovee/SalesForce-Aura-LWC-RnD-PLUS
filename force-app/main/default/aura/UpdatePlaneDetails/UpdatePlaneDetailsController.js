({
    doInit : function(component, event, helper) {
        var pageReference = component.get('v.pageReference');
        
        if(pageReference){
            var state = pageReference.state;
            
            component.set('v.planeId', state.c__planeId);
            
            console.log(state.c__planeId);
            //component.find("recordEditor").reloadRecord();

            var action = component.get('c.getPlane'); //getting the method from PlaneListXController
            action.setParams({
                searchID: state.c__planeId //passing the id as string parameter to the class you got.
            });

            //Step 4, create callback after the server side action returns..
        action.setCallback(this, function(response){
            var responseValue= response.getReturnValue();
            console.log('responseValue',responseValue);
            component.set('v.planeList',responseValue);
           
    }, 'SUCCESS');
    
    //Step 3
    $A.enqueueAction(action, false);
        }
    },

    doSave: function (component, event, helper) {
        var action = component.get('c.updatePlane');
        var conts = component.get('v.CreatePlane');
    
        var validContact = component.find('planeForm').reduce(function (validSoFar, inputCmp) {
    
          inputCmp.showHelpMessageIfInvalid();
          inputCmp.set('v.validity', { valid: false, badInput: true });
          return validSoFar && inputCmp.get('v.validity').valid;
    
        }, true);
    
    
    
    
        if (validContact) {
    
          action.setParams({
            con: component.get('v.planeList'),
            AccountId: component.get('v.planeId')
          });
    
          action.setCallback(
            this,
            function (response) {
              var state = response.getState();
              alert(state);
              if (state === 'SUCCESS' || state === 'DRAFT') {
    
                var responseValue = response.getReturnValue();
                var componentEvent = component.getEvent('quickPlane');
                componentEvent.setParams({
                  ContactRecord : responseValue
                });
                var toastEvent = $A.get("e.force:showToast");
                  toastEvent.setParams({
                      "title": "Success!",
                      "message": "The record has been updated successfully."
                  });
                  toastEvent.fire();
                  $A.get('e.force:refreshView').fire();
                componentEvent.fire();
                //getting the component and firing the component from the child component
              } else if (state === 'INCOMPLETE') {
    
    
              } else if (state === 'ERROR') {
    
                var errors = response.getError(); //Array of Error
                console.log('Error: ', errors[0].duplicateResults);
                console.log('Error: ', errors[0].fieldErrors);
                console.log('Error: ', errors[0].pageErrors);
    
                if (errors || errors[0].message) {
    
    
                }
    
              }
            },
            'ALL'
          );
    
          $A.enqueueAction(action);
    
    
        } else {
          console.log('Please input all the fields');
        }
    
    
      }
})