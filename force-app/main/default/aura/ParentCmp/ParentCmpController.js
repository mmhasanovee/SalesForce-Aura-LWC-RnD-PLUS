({
    doClick: function (component, event, helper) {
        var childCmp = component.find('childCmp');
        childCmp.child('I am from Parent CMP');
    },

    doHandle: function (component, event, helper) {
        alert('I am in parent');
    }
})