const jwt = require('jsonwebtoken')
const secret = "25genmern"

const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: 60 });
}

const verifyToken = (req, res, next) => {
    try {
        var token = req.headers.authorization;

        if (token != undefined) {
            if (token.startsWith("Bearer ")) {
                token = token.split(" ")[1]
                const payload = jwt.verify(token, secret)
                console.log("payload", payload);
                next();
            } else {
                res.status(401).json({
                    message: "User is not authorized to access this route"
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Token verification error",
            error: err
        });
    }
}

module.exports = {
    generateToken,
    verifyToken
};