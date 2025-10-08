import validator from 'validator';

const validateRegister = (username, email, password) => {
    const errors = [];
    if (!username || !email || !password) {
        errors.push("Faltan datos por enviar");
    } else {
        if (!validator.isEmail(email)) {
            errors.push("El email no es válido");
        }
        if (!validator.isLength(username, { min: 3, max: 20 })) {
            errors.push("El nombre de usuario debe tener entre 3 y 20 caracteres");
        }
        if (!validator.isLength(password, { min: 6 })) {
            errors.push("La contraseña debe tener al menos 6 caracteres");
        }
    }
    return errors;
}
const validateLogin = (email, password) => {
    const errors = [];
    if (!email || !password) {
        errors.push("Faltan datos por enviar");
    } else {
        if (!validator.isEmail(email)) {
            errors.push("El email no es válido");
        }
        if (!validator.isLength(password, { min: 6 })) {
            errors.push("La contraseña debe tener al menos 6 caracteres");
        }
    }
    return errors;
}

const validateUpdate = (email, username) => {
    const errors = [];
    if (!email || !username) {
        errors.push("Faltan datos por enviar");
    } else {
        if (!validator.isEmail(email)) {
            errors.push("El email no es válido");
        }
        if (!validator.isLength(username, { min: 3, max: 20 })) {
            errors.push("El nombre de usuario debe tener entre 3 y 20 caracteres");
        }
    }
    return errors;
}
export default { validateRegister, validateLogin, validateUpdate };