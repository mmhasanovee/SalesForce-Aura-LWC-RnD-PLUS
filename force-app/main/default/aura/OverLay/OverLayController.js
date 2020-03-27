({
    createModal: function (component, event, helper) {
        component.find('overLayLib').showCustomModal({
            header: "Application Confirmation",
            body: "This is the Body",
            showCloseButton: true,
            footer: "This is the Footer",
            closeCallback: function () {
                alert('You closed the alert!');
            }
        });
    },
    navigateUrl: function (component, event, helper) {
        var pageReference = component.find("navigation"); //finding component via the aura id
        var pageReferenceNav = {
            "type": "standard__component",
            "attributes": {
                "componentName": "c__BeerExplorer"
            },
            "state": {
                "myAttr": "attrValue"
            }
        };
        pageReference.navigate(pageReferenceNav); //navigate to navigation from overlay.cmp and forward the object created in here

    },

    handleLoad: function (component, event, helper) {

    },
    handleSuccess: function (component, event, helper) {

    },
    handleSubmit: function (component, event, helper) {

        alert('Submit handled');

    },
    createButton: function (component, event, helper) {
        $A.createComponent('lightning:button',
            {
                label: "I'm New Button",
                value: "I'm New Button",
                onclick: component.getReference("c.handleSubmit")
            }, function (newButton, status, errorMessage) {

                if (status === 'SUCCESS') {
                    var body = component.get('v.body');
                    body.push(newButton);
                    component.set('v.body', body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("Invalid response");

                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            });

    },

})