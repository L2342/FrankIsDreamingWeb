export const requireAdmin = (req, res, next) => {
    if (req.user?.sub?.role === 'admin') {
        next();
    } else {
        return res.status(403).send({
            status: "error",
            message: "No tienes permisos para realizar esta acción"
        });
    }
}