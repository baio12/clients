export const formatCurrency = (
    amount
) => {
    if (isNaN(amount)) return ''
    if (amount % 1 == 0) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits:2, 
            minimumFractionDigits:0,
        });
        const price = formatter.format(amount);
        return price.replace(/^(.{2})(.+)/, '$2$1').replace("MX", " MXN");
    }else {
        let fraction = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits:2, 
            minimumFractionDigits:2,
        });
        const price = fraction.format(amount);
        return price.replace(/^(.{2})(.+)/, '$2$1').replace("MX", " MXN");
    }
    
}
const formatterPeso = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export const formatPeso = (amount) => formatterPeso.format(amount);