({
    handleChild: function (component, event, helper) {

    var params = event.getParam('arguments'); //getting parameters from the parent
    if(params){
        var param1 = params.param1; //variable gets the actual value from the parent component
        alert('Nibba'+param1);
    }

    }
})