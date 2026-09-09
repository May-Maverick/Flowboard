import { useState } from "react";
import AuthInput from "../../components/authInput/AuthInput";
import "./Login.css"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <>
            <form onSubmit="" className="login-form">
                <AuthInput setValue={setEmail} value={email} height={30}  type="email" placeholder="Enter your email" />
                <AuthInput setValue={setPassword} value={password} height={30} type="password" placeholder="Enter your password" />
                <div className="auth-btn-wrapper" style={{height: "30%"}}>
                    <button type="submit" className="auth-btn" >Log In</button>
                </div>
            </form>
        </>
    )
}

export default Login;