({
  doSave: function(component, event, helper) {
    var action = component.get("c.insertNewPaan");
    var conts = component.get("v.insertNewPaanV");

    if (true) {
      action.setParams({
        paan: component.get("v.insertNewPaanV")
      });

      action.setCallback(
        this,
        function(response) {
          var state = response.getState();
          alert(state);
          if (state === "SUCCESS" || state === "DRAFT") {
            var responseValue = response.getReturnValue();
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
              title: "Success!",
              message: "The record has been inserted successfully."
            });
            toastEvent.fire();
            $A.get("e.force:refreshView").fire();
            componentEvent.fire();
            //getting the component and firing the component from the child component
          } else if (state === "INCOMPLETE") {
          } else if (state === "ERROR") {
            var errors = response.getError(); //Array of Error
            console.log("Error: ", errors);

            if (errors || errors[0].message) {
            }
          }
        },
        "ALL"
      );

      $A.enqueueAction(action);
    } else {
      console.log("Please input all the fields");
    }
  },

  selectColor: function(component, event, helper) {
    var colorValue = component.find("colorValue").get("v.value");
    console.log(colorValue);
    component.set("v.insertNewPaanV.Paan_Color__c", colorValue);
    var a = component.get("c.fieldValidate");
    $A.enqueueAction(a);
  },

  fieldValidate: function(component, event, helper) {
    var conts1 = component.get("v.insertNewPaanV.Name");
    var conts2 = component.get("v.insertNewPaanV.Paan_Color__c");
    var conts3 = component.get("v.insertNewPaanV.Paan_Description__c");
    var conts4 = component.get("v.insertNewPaanV.Paan_Img_Url__c");
    var conts5 = component.get("v.insertNewPaanV.Paan_Price__c");
    var conts6 = component.get("v.insertNewPaanV.Paan_Quantity__c");
    // console.log('conts1:', conts1);
    // console.log('conts2:', conts2);
    // console.log('conts3:', conts3);

    // if (conts1 != '') {
    //     console.log('conts1 is not null');
    // }

    if (conts1 == "" || conts2 == "" || conts3 == ""|| conts4 == ""|| conts5 == ""|| conts6 == "") {
      // console.log('one of them is not null');
      component.set("v.buttonDis", "true");
    } else {
      component.set("v.buttonDis", "false");
    }
  }
});
