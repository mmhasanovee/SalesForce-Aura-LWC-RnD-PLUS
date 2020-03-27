({
    doInit : function(component, event, helper) {
        var pageRef = component.get('v.pageReference');
        if(pageRef){
            var state = pageRef.state;
            component.set('v.orderId',state.c__orderId); //getting the value from the previous page and setting it to the attribute of the main cmp
            component.find('recordViewer').reloadRecord(); //after setting the value we have to reload the recordData in order to detect the changes

            
        }

    }
})