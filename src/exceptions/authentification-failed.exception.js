/*const res = require("express");

class AuthFailedException extends Error {
    constructor(message) {
        super(message)
        return res.status(401).json({
            message: "Auth failed",
        });
    }
}*/

//module.exports = AuthFailedException;

class AuthFailedException extends Error {
    constructor(message) {
        super(message|| "Auth failed");
        this.status = 401
    }
}

module.exports = AuthFailedException;