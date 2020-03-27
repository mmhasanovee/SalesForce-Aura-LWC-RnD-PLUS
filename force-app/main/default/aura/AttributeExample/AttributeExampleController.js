({
	doClick : function(component, event, helper) {
		alert(component.isValid());
        alert(component.getName());
        alert(component.get('v.Whom'));
        component.set('v.Whom','Test Value');
        var ageComp= component.find('testInput');
        alert(ageComp.get('v.value'));
        ageComp.set('v.value',67);
	}
})