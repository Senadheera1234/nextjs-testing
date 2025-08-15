
export const CustomerService = {
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },

    getCustomersLarge() {
        return fetch('/demo/data/customers-large.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },
    getCustomersMixed() {
        return fetch('demo/data/customers-mixed.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
};
