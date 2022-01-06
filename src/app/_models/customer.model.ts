export class Customer {
    country: string;
    state: boolean;
    countryCode: string;
    phone: string;

    constructor(country: string, state: boolean, countryCode: string, phone: string) {
        this.country = country;
        this.state = state;
        this.countryCode = countryCode;
        this.phone = phone;
    }
}