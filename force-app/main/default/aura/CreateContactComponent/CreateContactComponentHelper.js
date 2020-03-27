({
    validateFields: function (component, event, helper) {
        var isValid = component.find('newContact').reduce(function (validFields, inputComp) {
            //reduce function is part of array prototype javascript object. It takes a function as input and applies that on the array and returns the output.
            inputComp.showHelpMessageIfInvalid(); //Shows the help message if the form control is in an invalid state.
            inputComp.set('v.validity', { valid: false, badInput: true });
            return validFields && inputComp.get('v.validity').valid;
        }, true);
        return isValid;
    }
})