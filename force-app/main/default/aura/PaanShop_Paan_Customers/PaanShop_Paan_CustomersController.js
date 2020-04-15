({
  doInit: function (component, event, helper) {
    var action = component.get("c.fetchCustomer");
    $A.enqueueAction(action, false);
    action.setCallback(
      this,
      function (response) {
        var responseValue = response.getReturnValue();
        console.log("responseValue", responseValue);
        component.set("v.customerList", responseValue);
      },
      "SUCCESS"
    );

    window.addEventListener(
      "scroll",
      $A.getCallback(function () {
        var st = document.documentElement.scrollTop;
        if (st > 0) {
          console.log("scrolling down");
        } else {
          console.log("scrolling up");
        }
      })
    );
  },

  onCheck: function (component, event, helper) {
    var re = component.get("v.idToDelete");
    var whichOne = event.getSource();
    var buttonId = whichOne.get("v.name");

    if (re.includes(buttonId)) {
      for (var i = 0; i < re.length; i++) {
        if (re[i] === buttonId) {
          re.splice(i, 1);
        }
      }
    } else {
      re.push(buttonId);
      component.set("v.idToDelete", re);
    }
    var result = component.get("v.idToDelete");
    console.log("v.idToDelete", result);
  },

  doDelete: function (component, event, helper) {
    var idsToDelete = component.get("v.idToDelete");

    if (idsToDelete == "") {
      alert("Please select an entity first");
    } else {
      console.log(idsToDelete);
      var action = component.get("c.batchDeleteRecordFromCustomTableCmpC");
      action.setParams({
        listOfIds: idsToDelete //passing the id as string parameter to the class you got.
      });

      action.setCallback(this, function (response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          console.log("Success");
          location.reload();
        } else {
          console.log(response.getError());
        }
      });

      $A.enqueueAction(action);
    }
  },

  onScrollX: function (component, event, helper) {
    // console.log('scrolling');
    var elmnt = document.getElementById("customerListOfPaan");
    var position = elmnt.scrollTop;
    var totalHeight = elmnt.scrollHeight;
    // console.log('total height', totalHeight);
    // console.log('position', position);

    var lol = totalHeight - position;
    console.log("Total height is", lol);

    if (totalHeight - position <= 300) {
      var isLoading = component.get("v.isLoading");
      if (!isLoading) {
        component.set("v.isLoading", true);
        var offset = component.get("v.dataOffset");
        offset += 5;
        component.set("v.dataOffset", offset);
        //alert(offset);
        //event.getSource().set("v.isLoading", true);

        var action = component.get("c.getCustomerList");
        action.setParams({
          dLimit: 5,
          dOffset: offset
        });
        action.setCallback(this, function (response) {
          var responseValue = response.getReturnValue();
          //console.log('querydata',responseValue);
          //component.set('v.data',responseValue);
          var data = component.get("v.customerList");
          var newData = data.concat(responseValue);
          component.set("v.customerList", newData);
          component.set("v.isLoading", false);
          //event.getSource().set("v.isLoading", false);
        });
        $A.enqueueAction(action, false);
      }
    }
  },

  /////////////////////////// Insert new form starts here ////////////////////////////////

  doSave: function (component, event, helper) {
    var action = component.get("c.insertNewCustomer");
    var conts = component.get("v.insertNewCustomerV");

    if (true) {
      action.setParams({
        customer: component.get("v.insertNewCustomerV")
      });

      action.setCallback(
        this,
        function (response) {
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


  fieldValidate: function (component, event, helper) {
    var conts1 = component.get("v.insertNewCustomerV.Name");
    var conts2 = component.get("v.insertNewCustomerV.Phone_Number__c");
    var conts3 = component.get("v.insertNewCustomerV.Address__c");
    // console.log('conts1:', conts1);
    // console.log('conts2:', conts2);
    // console.log('conts3:', conts3);

    // if (conts1 != '') {
    //     console.log('conts1 is not null');
    // }

    if (
      conts1 == "" ||
      conts2 == "" ||
      conts3 == "" 
    ) {
      // console.log('one of them is not null');
      component.set("v.buttonDis", "true");
    } else {
      component.set("v.buttonDis", "false");
    }
  },

   //toggling disply
   toggleDisplay: function(component, event, helper) {
    var x = document.getElementById("formX");
    var y = document.getElementById("customerListOfPaan");
    var del = document.getElementById("deleteX");
    var btn = document.getElementById("insertX");
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = "none";
      del.style.display = "none";
      btn.innerHTML = "List";
    } else {
      x.style.display = "none";
      y.style.display = "block";
      del.style.display = "inline";
      btn.innerHTML = "Insert";
    }
  },
});
