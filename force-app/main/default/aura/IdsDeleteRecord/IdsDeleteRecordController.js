({
    handleDelete : function (component, event, helper) {
        component.find('recordDelete').deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === 'SUCCESS' || deleteResult.state === 'DRAFT') {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    "title": "Record Saved la he",
                    "type": "success",
                    "message": "Deleted the entry"
                });
                showToast.fire();
                var pageReference = component.find('navReference');
                var pageReferenceNav = {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'beer__c',
                        actionName: 'list'
                    },
                    state: {
                        
                    }
                };
                pageReference.navigate(pageReferenceNav);

            } else if (deleteResult.state === 'INCOMPLETE') {

            }
            else if (deleteResult.state === 'ERROR') {
            } else {

            }
        }));
    }
})