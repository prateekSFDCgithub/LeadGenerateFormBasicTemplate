import { LightningElement,track } from 'lwc';
import AssureanLogo from '@salesforce/resourceUrl/BLckLogo'; // Import the static resource
export default class HomeHeader extends LightningElement {
   @track logoUrl = AssureanLogo;
}