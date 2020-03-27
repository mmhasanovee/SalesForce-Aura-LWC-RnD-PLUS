import { LightningElement, wire } from 'lwc';
import getPlaneList from '@salesforce/apex/PlaneListXControllerLwc.getPlaneList'
export default class PlaneListXLwc extends LightningElement {

  @wire(getPlaneList) planes;
}