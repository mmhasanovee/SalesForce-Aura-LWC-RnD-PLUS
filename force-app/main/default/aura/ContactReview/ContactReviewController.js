({
	RemoveReord : function(component, event, helper) {
		var index = event.currentTarget.id;
        var existingRecords = component.get('v.ContactRecords');
        existingRecords.splice(index , 1); //two parameters, one is index and other is 0/1. 1 means to remove
        component.set('v.ContactRecords', existingRecords);
	},
    editRecord : function(component, event, helper) {
		var index = event.currentTarget.id;
        var existingRecords = component.get('v.ContactRecords');
        var selectedRecord = existingRecords[index];
        console.log('selectedRecord ', selectedRecord);
        
        var selRecordEvent = component.getEvent('SelectRecordEvent');
        selRecordEvent.setParams({
            Contact : selectedRecord
        });
        selRecordEvent.fire();
	},
})