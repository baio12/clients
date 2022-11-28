const formatterPeso = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const useFormatterCurrency = value => formatterPeso.format(value);

export default useFormatterCurrency;