import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { updateRecord } from 'lightning/uiRecordApi';

export default class lwcRedirect extends NavigationMixin(LightningElement)  {
    @api recordId;
    @api viewAction;
    @api forceRecordViewUpdate;
    @api actionName;
    @api objectApiName;
    @api label;

    get url() {
        return `${window.location.origin}/lightning/r/${this.objectApiName}/${this.recordId}/${this.actionName}`;
    }

    get actionName() {
        return this.viewAction == false ? 'edit' : 'view';
    }

    updateRecordView(recordId) {
        updateRecord({fields: { Id: recordId }}).catch(error => {
            console.error(error);
        });
    }
 
    connectedCallback() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                // In the flow, Where the LWC is inserted, put a text field / Id of the record you want to navigate to as the recordId
                recordId: this.recordId,

                // actionName can be changed to 'edit' or 'view' in the flow for different scenarios
                actionName: this.actionName
            }
        });

        if(this.forceRecordViewUpdate !== false) {
            this.updateRecordView(this.recordId);
        }
    }
    // Different ways Navigation can be used here -->
    // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.use_navigate_page_types

}