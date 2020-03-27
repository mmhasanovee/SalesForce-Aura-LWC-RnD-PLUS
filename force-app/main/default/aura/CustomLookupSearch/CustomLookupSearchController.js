({
    handleKeyUp: function (component, event, helper) {
        var searchText = component.find('enter-search').get('v.value');
        var searchEvent = component.getEvent('LookupEvent'); //name should be same as the main cmp file registered event name**
        searchEvent.setParams({
            searchText: searchText //setting paramenters to the event. Left is event's attribute name and right is var name in this component..
        });
        searchEvent.fire(); //firing the event
    }
})