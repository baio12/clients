export const emailRegex = (value) => {
    return /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

export const rfcRegex = (value) => {
    return /^([A-ZÑ&]{3,4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([A-Z\d]{2})([A\d])$/.test(value);
}

export const zipRegex = (value) => {
    return /^\d{5}(?:[- ]?\d{4})?$/.test(value);
}

export const phoneRegex = value => {
    return /^\d{10}$/.test(value);
}

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const passwordRegex = value => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/.test(value);
}

export const nameRegex = value => {
    return /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ,. -']{3,45}$|^$/.test(value);
}

export const containsNumbersRegex = value => {
    return /[0-9]/.test(value);
}

export const phoneOrEmail = value => {
    return /^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(value)
}