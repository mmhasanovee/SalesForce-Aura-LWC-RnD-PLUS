({
  doSave: function (component, event, helper) {
    var action = component.get('c.createContact');
    var conts = component.get('v.CreateContact');

    var validContact = component.find('contactForm').reduce(function (validSoFar, inputCmp) {

      inputCmp.showHelpMessageIfInvalid();
      inputCmp.set('v.validity', { valid: false, badInput: true });
      return validSoFar && inputCmp.get('v.validity').valid;

    }, true);




    if (validContact) {

      action.setParams({
        con: component.get('v.CreateContact'),
        AccountId: component.get('v.accountId')
      });

      action.setCallback(
        this,
        function (response) {
          var state = response.getState();
          alert(state);
          if (state === 'SUCCESS' || state === 'DRAFT') {

            var responseValue = response.getReturnValue();
            var componentEvent = component.getEvent('quickContact');
            componentEvent.setParams({
              ContactRecord : responseValue
            });
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
});