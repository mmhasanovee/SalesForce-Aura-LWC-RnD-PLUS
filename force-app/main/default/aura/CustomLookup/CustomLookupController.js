({
    doHandleSearchEvent: function (component, event, helper) {
        var searchParam = event.getParam('searchText'); //same name as the event's attribute name
        var action = component.get('c.getRecordList'); //method on the controller
        action.setParams({
            ObjectName: component.get('v.objName'),
            sreachText: searchParam,
            fieldInSearch: component.get('v.fieldName')
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            //alert(state);
            if (state === 'SUCCESS' || state === 'DRAFT') {
                var responseValue = response.getReturnValue();

                for (let i = 0; i < responseValue.length; i++) {
                    responseValue[i].Name = responseValue[i][component.get('v.fieldName')] //getting the field name and putting in the array. Becauase function is returning list of objects.
                }
                console.log('responseValue ', responseValue);
                component.set('v.recordList', responseValue);
            }
        });
        $A.enqueueAction(action);
    },
    doHandleSelectEvent: function (component, event, helper) {
        var record = event.getParam('record'); //should be same as event's attribute name
        console.log('record ', record.Id);
        component.set('v.selecteRecord', record); //setting value on the parent component
        var fieldAPIName = component.get('v.fieldName');
        //alert(record[fieldAPIName]);
        component.set('v.recordValue', record[fieldAPIName]); //setting only one field
        component.set('v.recordList', null); //removing the rest of the fiels which aren't selected
    },
    handleRemove: function (component, event, helper) {
        event.preventDefault();
        component.set('v.selecteRecord', null); //removing both selected record previously
        component.set('v.recordValue', null); //also removing the value of the record..
    }
})