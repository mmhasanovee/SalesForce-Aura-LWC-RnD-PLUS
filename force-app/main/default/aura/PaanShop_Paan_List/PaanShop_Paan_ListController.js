({
  doInit: function(component, event, helper) {
    var action = component.get("c.getPaanListOfAll");

    $A.enqueueAction(action, false);
    action.setCallback(
      this,
      function(response) {
        var responseValue = response.getReturnValue();
        // console.log("responseValue", responseValue);
        component.set("v.paanList", responseValue);
      },
      "SUCCESS"
    );
  },

  insertNew: function(component, event, helper) {
    alert("working");
  },

  /////////////////////////// Insert new form starts here ////////////////////////////////

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

  // for updating the paan value finally

  doUpdate: function(component, event, helper) {
    var action = component.get("c.updatePaanValue");
    var conts = component.get("v.updatePaanV");
    var id = document.querySelector("#update").value;
    console.log(id);

    action.setParams({
      paan: conts,
      AccountId: id
    });

    action.setCallback(
      this,
      function(response) {
        var state = response.getState();
        alert(state);
        if (state === "SUCCESS" || state === "DRAFT") {
          var toastEvent = $A.get("e.force:showToast");
          toastEvent.setParams({
            title: "Success!",
            message: "The record has been updated successfully."
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

    console.log(id);
  },

  selectColor: function(component, event, helper) {
    var colorValue = component.find("colorValue").get("v.value");
    console.log(colorValue);
    component.set("v.insertNewPaanV.Paan_Color__c", colorValue);
    var a = component.get("c.fieldValidate");
    $A.enqueueAction(a);
  },

  selectUpdateColor: function(component, event, helper) {
    var colorValue = component.find("updatecolorValue").get("v.value");
    console.log(colorValue);
    component.set("v.updatePaanV.Paan_Color__c", colorValue);
    var a = component.get("c.fieldValidateForUpdate");
    $A.enqueueAction(a);
  },

  fieldValidateForUpdate: function(component, event, helper) {
    var conts1 = component.get("v.updatePaanV.Name");
    var conts2 = component.get("v.updatePaanV.Paan_Color__c");
    var conts3 = component.get("v.updatePaanV.Paan_Description__c");
    var conts4 = component.get("v.updatePaanV.Paan_Img_Url__c");
    var conts5 = component.get("v.updatePaanV.Paan_Price__c");
    var conts6 = component.get("v.updatePaanV.Paan_Quantity__c");
    // console.log('conts1:', conts1);
    // console.log('conts2:', conts2);
    // console.log('conts3:', conts3);

    // if (conts1 != '') {
    //     console.log('conts1 is not null');
    // }

    if (
      conts1 == "" ||
      conts2 == "" ||
      conts3 == "" ||
      conts4 == "" ||
      conts5 == "" ||
      conts6 == ""
    ) {
      // console.log('one of them is not null');
      component.set("v.buttonDisUpdate", "true");
    } else {
      component.set("v.buttonDisUpdate", "false");
    }
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

    if (
      conts1 == "" ||
      conts2 == "" ||
      conts3 == "" ||
      conts4 == "" ||
      conts5 == "" ||
      conts6 == ""
    ) {
      // console.log('one of them is not null');
      component.set("v.buttonDis", "true");
    } else {
      component.set("v.buttonDis", "false");
    }
  },

  //toggling disply
  toggleDisplay: function(component, event, helper) {
    var x = document.getElementById("form");
    var y = document.getElementById("list");
    var btn = document.getElementById("insert");
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = "none";
      btn.innerHTML = "Show List";
    } else {
      x.style.display = "none";
      y.style.display = "block";
      btn.innerHTML = "Insert New";
    }
  },

  detailView: function(component, event, helper) {
    var pageReference = component.find("navigation"); //finding component via the aura id
    console.log("sdd");
    var id = event.getSource().get("v.value");
    var img = event.getSource().get("v.name");
    component.set("v.paanId", id);
    document.querySelector("#delete").value = id;
    document.querySelector("#update").value = id;
    component.set("v.imageurl", img);

    var y = document.getElementById("list");
    var btn = document.getElementById("insert");
    var update = document.getElementById("update");
    var del = document.getElementById("delete");
    var recordViewPaan = document.getElementById("recordViewPaan");
    y.style.display = "none";
    btn.style.display = "none";
    recordViewPaan.style.display = "block";
    update.style.display = "inline";
    del.style.display = "inline";
  },

  deletePaan: function(component, event, helper) {
    if (confirm("Are you sure you want to delete this record?")) {
      var idToDelete = document.getElementById("delete").value;
      var action = component.get("c.DeleteRecord");
      if (true) {
        action.setParams({
          delId: idToDelete
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
                message: "The record has been deleted successfully."
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
      }
    } else {
    }
  },

  updatePaan: function(component, event, helper) {
    var idToUpdate = document.getElementById("update").value;

    var action = component.get("c.getPaan"); //getting the method from PlaneListXController
    action.setParams({
      searchID: idToUpdate //passing the id as string parameter to the class you got.
    });

    action.setCallback(
      this,
      function(response) {
        var responseValue = response.getReturnValue();
        //console.log("responseValue", responseValue);
        component.set("v.updatePaanV", responseValue);
      },
      "SUCCESS"
    );

    $A.enqueueAction(action, false);

    var update = document.getElementById("updateForm");
    update.style.display = "block";
    var id = event.getSource().get("v.value");
    document.querySelector("#update").value = id;

    console.log("Printing paan value");
    console.log(component.get("v.updatePaanV"));
  }
});
