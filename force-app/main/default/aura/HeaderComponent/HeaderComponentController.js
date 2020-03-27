({
    updateCart: function (component, event, helper) {
        var params = event.getParam('arguments');
        //alert('Header Component');
        if (params) {
            var beerRecord = params.beerRecord;
            var existingRecords = component.get('v.recordList');
            if (existingRecords) {
                existingRecords.push(beerRecord);
                component.set('v.recordList', existingRecords);
            } else {

                existingRecords = [];
                existingRecords.push(beerRecord);
                component.set('v.recordList', existingRecords);
            }


            //Toast message 
            var sMsg = 'CONGRATS! \n';
            sMsg += 'Item to the cart successfully';

            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'sticky',
                message: sMsg,
                type: 'success'
            });
            toastEvent.fire();
        }

    }

})