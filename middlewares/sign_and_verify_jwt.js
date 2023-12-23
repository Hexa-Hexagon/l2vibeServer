require('dotenv').config();
const jwt = require('jsonwebtoken');


class CustomError {
    constructor(type = "Error", message = "Error", code = 500) {
        this.type = type;
        this.message = message;
        this.code = code;
    }
}

const verify = (token) => {
    return jwt.verify(token, process.env.PUBLIC_JWT_KEY, (error, user) => {
        if (error) {
            throw new CustomError(error.name, error.message, 500);
        }
        if (user.is_admin === undefined) {
            throw new CustomError("Error", "The is_admin field does not exist", 500);
        }
        return user.is_admin;
    });
}

module.exports.sign = (response) => {
    try {
        return jwt.sign({ admin: true }, process.env.SECRET_JWT_KEY, { algorithm: 'RS256', expiresIn: '1h' });
    } catch (error) {
        response.status(500).send({ type: 'JWT Error', msg: "Sign Error" });
    }
}

module.exports.authenticate = (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        const allToken = authHeader && authHeader.split(' ')[1];
        if (!allToken) {
            throw new CustomError("Error", "Token is NULL", 401);
        }
        const result = verify(allToken);
        if (!result) {
            throw new CustomError("Error", "Access denied", 403);
        }
        next();
    } catch (error) {
        response.status(error.code).send({ type: error.type, msg: error.message });
    }
}