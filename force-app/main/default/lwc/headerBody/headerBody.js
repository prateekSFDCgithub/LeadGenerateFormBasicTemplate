import { LightningElement } from 'lwc';

export default class HeaderBody extends LightningElement {
    isHomeTab = true;
    isAboutTab = false;

    get homeTabClass() {
        return this.isHomeTab ? 'active-tab' : '';
    }

    get aboutTabClass() {
        return this.isAboutTab ? 'active-tab' : '';
    }

    OpenFormFun(event) {
        window.location.href = 'https://rqapp--devamit.sandbox.my.site.com/onboard/franchise-form';
    }

    showHomeTab() {
        this.isHomeTab = true;
        this.isAboutTab = false;
    }

    showAboutTab() {
        this.isHomeTab = false;
        this.isAboutTab = true;
    }
}