import User from "../models/User";
import validator from "../helpers/validator";
import bcrypt from "../helpers/bcrypt";
import jwt from "../helpers/jwt";


//Crear nuevos usuarios
const register = async (req, res) => {
    const { username, email, password } = req.body;
    const validate = validator.validateRegister(username, email, password);
    if (validate.length > 0) {
        return res.status(400).send({
            status: "error",
            message: validate
        });
    }
    // Comprobamos que el usuario no exista ya en la base de datos
    const userExist = await User.findOne({
        $or: [{ email: email }, { username: username }]
    });
    if (userExist) {
        return res.status(400).send({
            status: "error",
            message: "ya existe un usuario con esas credenciales"
        });
    }

    const hashedPassword = await bcrypt.hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });
    // Guardamos el usuario en la base de datos
    try {
        await user.save();
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al crear el usuario"
        });
    }
    return res.status(200).send({
        status: "success",
        message: "Usuario creado correctamente",
    });
}

//Login de usuarios
const login = async (req, res) => {
    const { email, password } = req.body;
    const validate = validator.validateLogin(email, password);
    if (validate.length > 0) {
        return res.status(400).send({
            status: "error",
            message: validate
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        const isMatch = await bcrypt.comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }
        const token = jwt.createToken(user);
        return res.status(200).send({
            status: "success",
            message: "Login correcto",
            token
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al buscar el usuario"
        });
    }
}

// Ver información del usuario
const profile = async (req, res) => {
    const idUser = req.user.sub.id;
    try {
        const user = await User.findById(idUser).select('-password -__v');
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).send({
            status: "success",
            user
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al obtener la información del usuario"
        });
    }
}

//Editar información del usuario
const update = async (req, res) => {
    const idUser = req.user.sub.id;
    const params = req.body;
    //Eliminar campos que no quiero actualizar

    delete params.role;
    delete params.password;
    delete params._id;
    delete params.__v;
    delete params.createdAt;
    delete params.image;
    delete params.iat;
    delete params.exp;
    delete params.sub;
    // Solo va a poder cambiar username y email
    const validate = validator.validateUpdate(params);
    if (validate.length > 0) {
        return res.status(400).send({
            status: "error",
            message: validate
        });
    }
    try {
        const userExist = await User.findOne({
            $or: [
                { email: params.email },
                { username: params.username }
            ]
        });
        if (userExist) {
            return res.status(400).send({
                status: "error",
                message: "Ya existe un usuario con esas credenciales"
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al consultar el usuario"
        });
    }
    try {
        const userUpdated = await User.findByIdAndUpdate(idUser, params, { new: true }).select('-password -__v -role');
        if (!userUpdated) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).send({
            status: "success",
            message: "Usuario actualizado correctamente",
            user: userUpdated
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al actualizar el usuario"
        });
    }
}

export default { register, login, profile, update };