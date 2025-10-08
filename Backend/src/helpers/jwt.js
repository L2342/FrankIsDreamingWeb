import jwtSimple from "jwt-simple";
import moment from "moment";
import { configDotenv } from "dotenv";

configDotenv();

const createToken = (user) => {
    const payload = {
        sub: {id: user._id, role: user.role},
        iat: moment().unix(),
        exp: moment().add(7, "days").unix()
    };
    return jwtSimple.encode(payload, process.env.JWT_SECRET);
}

const decodeToken = (token) => {
    try {
        const payload = jwtSimple.decode(token, process.env.JWT_SECRET);
        if (payload.exp <= moment().unix()) {
            throw new Error("Token expirado");
        }
        return payload;
    } catch (error) {
        throw new Error("Token inválido");
    }
}

export default { createToken, decodeToken };