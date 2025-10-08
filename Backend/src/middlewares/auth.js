import jwt from "../helpers/jwt";

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            status: "error",
            message: "No se proporcionó un token"
        });
    }
    try {
        const decoded = jwt.decodeToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: "error",
            message: error.message
        });
    }
}

export default checkAuth;
