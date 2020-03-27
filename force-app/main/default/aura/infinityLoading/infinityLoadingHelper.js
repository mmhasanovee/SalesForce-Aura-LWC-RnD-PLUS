({
    getData: function (component) {
        // call apex class method
        var action = component.get("c.getAccountRecords");
        var valueToPass = component.get("v.initialRows");

        action.setParams({
            initialRows: valueToPass  //how many rows to load during initialization
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            //var toastReference = $A.get("e.force:showToast");
            if (state == "SUCCESS") {
                var accountWrapper = response.getReturnValue();
                if (accountWrapper.success) {
                    // set total rows count from response wrapper
                    component.set("v.totalRows", accountWrapper.totalRecords);

                    var accountList = accountWrapper.accountsList;
                    // play a for each loop on list of account and set Account URL in custom 'accountName' field
                    accountList.forEach(function (account) {
                        account.accountName = '/' + account.Id;
                    });
                    // set the updated response on accountData aura attribute  
                    component.set("v.accountData", accountList);
                    // display a success message  
                    // toastReference.setParams({
                    //     "type": "Success",
                    //     "title": "Success",
                    //     "message": accountWrapper.message,
                    //     "mode": "dismissible"
                    // });
                    // toastReference.fire();
                }
                else { // if any server side error, display error msg from response
                    // toastReference.setParams({
                    //     "type": "Error",
                    //     "title": "Error",
                    //     "message": accountWrapper.message,
                    //     "mode": "sticky"
                    // });
                    // toastReference.fire();
                }
            }
            else { // if any callback error, display error msg
                // toastReference.setParams({
                //     "type": "Error",
                //     "title": "Error",
                //     "message": 'An error occurred during Initialization ' + state,
                //     "mode": "sticky"
                // });
                // toastReference.fire();
            }
        });
        $A.enqueueAction(action);
    },

    loadData: function (component) {
        return new Promise($A.getCallback(function (resolve) {
            var limit = component.get("v.initialRows");
            var offset = component.get("v.currentCount");
            var totalRows = component.get("v.totalRows");
            if (limit + offset > totalRows) {
                limit = totalRows - offset;
            }
            var action = component.get("c.loadAccountRecords");
            action.setParams({
                "rowLimit": limit,
                "rowOffset": offset
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                var newData = response.getReturnValue();
                // play a for each loop on list of new accounts and set Account URL in custom 'accountName' field
                newData.forEach(function (account) {
                    account.accountName = '/' + account.Id;
                });
                resolve(newData);
                var currentCount = component.get("v.currentCount");
                currentCount += component.get("v.initialRows");
                // set the current count with number of records loaded 
                component.set("v.currentCount", currentCount);
            });
            $A.enqueueAction(action);
        }));
    }
})