({
    doOrder: function (component, event, helper) {
        var pageReference = component.find("navigation"); //finding component via the aura id
        var pageReferenceNav = {
            "type": "standard__component",
            "attributes": {
                "componentName": "c__CreateBeerOrder"
            },
            "state": {
                "c__beerId": component.get('v.beerId'),
                "c__beerName":component.get('v.beerName')
            }
        };
        var alertBeerid=component.get('v.beerName');
        
        pageReference.navigate(pageReferenceNav); 
        //navigate to navigation from overlay.cmp and forward the object created in here
    }
})