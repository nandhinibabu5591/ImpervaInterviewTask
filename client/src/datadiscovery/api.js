export default class DetailsAPIService {
    constructor() {
        this.getPaymentInfo = this.getPaymentInfo.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }

    getOrders = async (customerId) => {
        const response = await fetch(`/api/orders/${customerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        const record = await response.json();
        if (response.status !== 200) {
            throw Error(record.message)
        }
        return record;
    }

    getPaymentInfo = async (customerId) => {
        const response = await fetch(`/api/payment/${customerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        const record = await response.json();
        if (response.status !== 200) {
            throw Error(record.message)
        }
        return record;
    }

    getProducts = async (productCode) => {
        const response = await fetch(`/api/products/${productCode}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        const record = await response.json();
        if (response.status !== 200) {
            throw Error(record.message)
        }
        console.log(record);
        return record;
    }
}