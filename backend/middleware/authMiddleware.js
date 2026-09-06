import throwError from "./throwError.js";
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers?.authorization;
    if(!authHeader) {
        throwError(401, "No authorization header");
    }

    const token = authHeader.split(" ")[1];

    if(!token) {
        throwError(401, "No token found");
    }

    const userObj = jwt.verify(token, process.env.JWT_SECRET);

    if(!userObj) {
        throwError(401, "Invalid token");
    }

    req.userId = userObj.userId;
    next();
}

export default authMiddleware;