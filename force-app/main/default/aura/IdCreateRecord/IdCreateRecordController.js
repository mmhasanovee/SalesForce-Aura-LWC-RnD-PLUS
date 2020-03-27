({
    doInit: function (component, event, helper) {
        component.find('recordCreator').getNewRecord(
            'beer__c',
            null,
            false,
            $A.getCallback(function () {

                var record = component.get('v.record');
                var error = component.get('v.recordError');

                if (error || (record === null)) {
                    console.log('Error zz', console.error
                    );

                } else {
                    // alert('Created yeah!');
                }
            })
        );
    },

    handleSave: function (component, event, helper) {
        component.find('recordCreator').saveRecord(function (saveResult) {
            if (saveResult.state === 'SUCCESS' || saveResult.state === 'DRAFT') {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    "title" : "Record Saved la he",
                    "type" :"success",
                    "message" :"Created with Id of"+saveResult.Id
                });
                showToast.fire();

            } else if (saveResult.state === 'INCOMPLETE') {

            } else {

            }
        });
    }
})