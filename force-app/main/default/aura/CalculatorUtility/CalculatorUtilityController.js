({
	doAdd : function(component, event, helper) {
		var n1=component.get('v.input1');
        var n2=component.get('v.input2');
        component.set('v.output',parseInt(n1)+parseInt(n2));
	},
    doSub : function(component, event, helper) {
		var n1=component.get('v.input1');
        var n2=component.get('v.input2');
        component.set('v.output',parseInt(n1)-parseInt(n2));
	},
    doMul : function(component, event, helper) {
		var n1=component.get('v.input1');
        var n2=component.get('v.input2');
       component.set('v.output',parseInt(n1)*parseInt(n2));
	},
    doDiv : function(component, event, helper) {
		var n1=component.get('v.input1');
        var n2=component.get('v.input2');
        component.set('v.output',parseInt(n1)/parseInt(n2));
	},
})