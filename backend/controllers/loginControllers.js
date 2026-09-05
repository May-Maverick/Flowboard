import throwError from "../middleware/throwError.js"
import { getUser } from "../db/models/userModel.js";
import bcrypt from "bcrypt";

const login = async(req, res, next) => {
    const {email, password} = req.body;

    if(!(email && password)) {
        throwError(401, "Invalid credentials entered");
    }

    const user = await getUser(email);

    if(!user) {
        throwError(401, "Account not found");
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if(!validPassword) {
        throwError(401, "Invalid password");
    }

    req.userId = user.id;
    next();
}

export default login;