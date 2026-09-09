import { addUser } from "../db/models/userModel.js";
import throwError from "../middleware/throwError.js";
import bcrypt from "bcrypt";


export const signupUser = async (req, res, next) => {
    const {email, password, username, firstName, lastName} = req.body;

    if(!(email && password && username && firstName && lastName)) {
        throwError(401, "Invalid credentials entered");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if(!passwordHash) {
        throwError(401, "Failed to hash password");
    }
    const user = await addUser(email, passwordHash, username, firstName, lastName);

    if (!user) {
        throwError(401, "Failed to create user");
    }

    req.userId = user.id;
    next();
    
}