import { LightningElement, api, track } from 'lwc';

export default class MyFirstLWC extends LightningElement {
    @api publicVariable = 'I am inside @api'; //public, rerenders
    @track privateVariable = 'I am inside @track'; //private, rerenders
    phone = '01800000000'; //doesn't re-render on value change

}
//check the value of the phone

// Both @track and @api mark a property as reactive. If the property’s value changes, the component rerenders. Tracked properties are private, where properties decorated with @api are public and can be set by another component.

//The core module in Lightning Web Components is lwc. The import statement imports LightningElement from the lwc module.

//Extend LightningElement to create a JavaScript class for a Lightning web component.