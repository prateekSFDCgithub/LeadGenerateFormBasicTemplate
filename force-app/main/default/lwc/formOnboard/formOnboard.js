import { LightningElement, track } from 'lwc';
import createLead from '@salesforce/apex/LeadController.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FormOnboard extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track phone = '';
    @track email = '';
    @track city = '';
    @track state = '';
    @track country = '';
    @track yearsOfInsuranceAgencyExperience = '';
    @track P_CInsuranceSalesExperience = '';
    @track captiveAgentExperience = '';
    @track franchiseProgramSource = '';
    @track primaryBusiness = '';
    @track availableCapital = '';
    @track franchiseState = '';
    @track experienceReason = '';
    @track emailError = '';
    @track phoneError = '';
    @track isLoading = false;
    @track disabledVar = false;
    @track AdressError = false;
    @track cityError=false;
    @track stateError=false;
    @track countryError=false;
    // Regular expression for email validation
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    phoneRegex = /^[0-9]+$/;
    alphaRegex = /^[A-Za-z]+$/;
    handlePhoneChange(event) {
        this.phone = event.target.value;
        console.log('')
        this.phoneError = !this.phoneRegex.test(this.phone);
        if (this.phone == '') {
            this.phoneError = false;
        }
    }

    // Handle input change for text fields
    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;

        this.emailError = !this.emailRegex.test(this.email);

        if (this.email == '') {
            this.emailError = false;
        }

    }
    handleAddressChange(event) {
        const field = event.target.dataset.id;
         this[field] = event.target.value;
        if (field == 'country') {
            this.countryError = !this.alphaRegex.test(this[field]);
            console.log('countryInside');
        }
        if (this.country == '') {
            this.countryError = false;
        }
        if (field == "state") {
            this.stateError = !this.alphaRegex.test(this[field]);
        }
        if (this.state == '') {
            this.stateError = false;
        }
        if (field == "city") {
            this.cityError = !this.alphaRegex.test(this[field]);
        }
        if (this.city == '') {
            this.cityError = false;
        }
     }

    // Handle select change for dropdowns
    handleSelectChange(event) {
        const selectElem = event.target;
        this[selectElem.dataset.id] = selectElem.value;
    }

    // Validate form fields before submission
    validateForm() {
        const fields = [
            'firstName',
            'lastName',
            'phone',
            'city',
            'state',
            'country',
            'yearsOfInsuranceAgencyExperience',
            'P_CInsuranceSalesExperience',
            'captiveAgentExperience',
            'franchiseProgramSource',
            'primaryBusiness',
            'availableCapital',
            'franchiseState',
            'experienceReason'
        ];

        // Check if all fields are filled
        const allFieldsFilled = fields.every(field => this[field] && this[field].trim() !== '');
        if (!allFieldsFilled) {
            this.showCustomToast('Please fill all the fields to submit the form.', 'warning');
            return false;
        }

        // Validate email format
        if (!this.emailRegex.test(this.email)) {
            this.showCustomToast('Please enter a valid email address.', 'warning');
            return false;
        }

        return true; // Return true if all validations pass
    }

    // Show custom toast
    showCustomToast(message, variant) {
        this.template.querySelector('c-custom-toast').showToast(variant, message, `utility:${variant}`, 4000);
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();

        // Validate form before proceeding
        if (!this.validateForm()) {
            return; // Stop submission if validation fails
        }

        this.isLoading = true; // Show loading spinner

        // Call Apex method to create lead
        createLead({
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            city: this.city,
            state: this.state,
            country: this.country,
            yearsOfInsuranceAgencyExperience: this.yearsOfInsuranceAgencyExperience,
            P_CInsuranceSalesExperience: this.P_CInsuranceSalesExperience,
            captiveAgentExperience: this.captiveAgentExperience,
            franchiseProgramSource: this.franchiseProgramSource,
            primaryBusiness: this.primaryBusiness,
            availableCapital: this.availableCapital,
            franchiseState: this.franchiseState,
            experienceReason: this.experienceReason
        })
            .then(() => {
                this.isLoading = false; // Hide loading spinner
                this.showCustomToast('Form Submitted Successfully!', 'success');
                this.resetForm();
            })
            .catch(error => {
                this.isLoading = false; // Hide loading spinner
                this.showCustomToast(`Error: ${JSON.stringify(error)}`, 'error');
            });
    }

    // Reset the form after submission
    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.email = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.yearsOfInsuranceAgencyExperience = '';
        this.P_CInsuranceSalesExperience = '';
        this.captiveAgentExperience = '';
        this.franchiseProgramSource = '';
        this.primaryBusiness = '';
        this.availableCapital = '';
        this.franchiseState = '';
        this.experienceReason = '';
        this.emailError = false;
        this.template.querySelectorAll('input, select').forEach(el => el.value = '');
        this.disabledVar = true;
    }
}