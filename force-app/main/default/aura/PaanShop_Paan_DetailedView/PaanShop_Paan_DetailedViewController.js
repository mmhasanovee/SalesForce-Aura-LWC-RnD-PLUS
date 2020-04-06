({
    doInit: function (component, event, helper) {
        var pageReference = component.get('v.pageReference');

        if (pageReference) {
            var state = pageReference.state;

            component.set('v.paanId', c__paanId);
            
            
        }
        console.log('v.paanId');
        
    }
})
