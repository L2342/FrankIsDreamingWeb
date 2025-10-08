import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error al hashear la contraseña");
    }
}

const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error("Error al comparar las contraseñas");
    }
}

export default { hashPassword, comparePasswords };