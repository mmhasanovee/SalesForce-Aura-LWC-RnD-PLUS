({
    executeEvent  : function(component, event, helper) {
        var compEvent = component.getEvent('SourceComponent');

        alert('I am from Source Component');
        compEvent.fire();
    }
})