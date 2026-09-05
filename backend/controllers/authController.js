import jwt from "jsonwebtoken";
import throwError from "../middleware/throwError.js";

const generateToken = (req, res) => {
    
    const token = jwt.sign({userId: req.userId}, process.env.JWT_SECRET);
    if(!token) {
        throwError(401, "Failed to generate token");
    }
    res.status(201).json({token});
}

export default generateToken;