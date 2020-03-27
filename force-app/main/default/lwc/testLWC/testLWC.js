import { LightningElement,track } from 'lwc';

export default class TestLWC extends LightningElement { //extending because we are creating custom lightning component~~

    @track greeting = 'NameHere'; //To track a private property's value and render a component when it changes, decorate the property with @track . You can use a tracked property directly in a template. You can also use a tracked property indirectly in the getter of a property that's used in a template.

    greetUser(){
        let txtInput = this.template.querySelector(".txtInput");
        this.greeting = txtInput.value;
    }
}