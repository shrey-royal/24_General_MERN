const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token", token);

    if (token == "123456") {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {
    authMiddleware
}