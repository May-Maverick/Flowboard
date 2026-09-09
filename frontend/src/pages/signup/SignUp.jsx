import "./SignUp.css"
import AuthInput from "../../components/authInput/AuthInput.jsx";
import { useState } from "react";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");

    return (
        <>
        <form onSubmit="" className="signup-form">
            <div className="names">
               <AuthInput setValue={setFirstName} value={firstName}  width={48} placeholder="Enter first name" />
               <AuthInput setValue={setLastName} value={lastName} width={48} placeholder="Enter last name" />
            </div>
            <AuthInput setValue={setEmail} value={email} height={20} type="email" placeholder="Enter email" />
            <AuthInput setValue={setPassword} value={password} height={20} type="password" placeholder="Enter password" />
            <AuthInput setValue={setConfirmpassword} value={confirmPassword} height={20} type="password" placeholder="Confirm password" />
            <div className="auth-btn-wrapper" style={{height: "20%"}}>
                <button className="auth-btn"  type="submit">Sign Up</button>
            </div>
        </form>
        </>
    )
}

export default SignUp;