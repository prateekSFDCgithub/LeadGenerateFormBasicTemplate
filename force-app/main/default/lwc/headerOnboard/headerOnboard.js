import { LightningElement,track } from 'lwc';
import AssureanLogo from '@salesforce/resourceUrl/AssureanHead'; // Import the static resource
export default class headerOnboard extends LightningElement {

  @track  logoUrl = AssureanLogo;
}