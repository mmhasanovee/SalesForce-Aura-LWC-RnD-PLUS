({
    doSelect: function (component, event, helper) {
        var index = event.currentTarget.id; //getting index of currently selected value
        var selectedRecord = component.get('v.recordList')[index]; //getting the object that was selected.
        console.log(' selectedRecord ', selectedRecord);
        var selectEvent = component.getEvent('selectEvent'); //name should be same as registererd event's name-->>
        selectEvent.setParams({
            record: selectedRecord //passing the value is selected on the selected event..
        });
        selectEvent.fire(); //firing the event.
    }
})