({
    doInit: function (component, event, helper) {
        var actions = [{
            label: 'Show Details',
            name: 'show_details',
            iconName: 'action:preview'
        },
        {
            label: 'Delete',
            name: 'delete',
            iconName: 'action:delete'
        }];
        component.set('v.columns', [
            { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true },
            { label: 'Industry', fieldName: 'Industry', type: 'text' },
            { label: 'Rating', fieldName: 'Rating', type: 'text' },
            { label: 'Phone', fieldName: 'Phone', type: 'text', editable: true },
            { type: "action", typeAttributes: { rowActions: actions } }
        ]);
        var action = component.get('c.fetchAccount');
        action.setCallback(this, function (response) {
            var state = response.getState();
            //alert(state);
            if (state === 'SUCCESS' || state === 'DRAFT') {
                var responseValue = response.getReturnValue();
                console.log('responseValue ', responseValue)
                component.set('v.data', responseValue);
            }
        });
        $A.enqueueAction(action);
    },
    doSelectRecord: function (component, event, helper) {
        var selectedRows = event.getParam('selectedRows'); //selectedrows is a built in attribute which should return all the properties of the rows.
        var show = 'slds-p-around_small';
        var hide = 'slds-hide';
        if (selectedRows.length != 0) {
            component.set('v.hide', show);
            component.set('v.selected', selectedRows);
        }
        else {
            component.set('v.hide', hide)
        }
        console.log('selectedRows ', selectedRows);
    },
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        console.log('action ', action.name);
        console.log(' row ', row.Id)
        switch (action.name) {
            case 'show_details':
                alert(row.Id + ' ' + row.Name);
                break;
            case 'delete':
                var data = component.get('v.data');
                var index = data.indexOf(row);
                data.splice(index, 1);
                // splice - 3 Params 
                // 1- index (add/remove)
                // no of items to add/remove
                // optional list of items that we wanted to add
                component.set('v.data', data);
                break;
        }
    },
    handleDraftValues: function (component, event, helper) {
        var draftRecords = event.getParam('draftValues');
        console.log(' draftRecords ', draftRecords);
        var data = component.get('v.data');
        for (let i = 0; i < draftRecords.length; i++) {
            var id = draftRecords[i].id;
            alert(draftRecords[i].id + '  Id = ' + id.substring(4, id.length));
            console.log(data[id.substring(4, id.length)]);
        }
    },

    doDelete: function (component, event, helper) {
        var idToDelete = component.get('v.selected'); //getting ids only for deleting.

        var action = component.get('c.batchDeleteRecord');

        action.setParams({

            mewmew: idToDelete
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            //alert(state);
            if (state === 'SUCCESS' || state === 'DRAFT') {

                console.log('Deleted Successfully');

            }
        });

        $A.enqueueAction(action);

        //console.log('idToDelete', idToDelete);

    }
})