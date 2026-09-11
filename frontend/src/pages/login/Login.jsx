import { useState } from "react";
import AuthInput from "../../components/authInput/AuthInput.jsx";
import "./Login.css"
import useFetch from "../../hooks/useFetch.jsx";
import { useNavigate } from "react-router-dom";
import LoadAnimation from "../../components/loadAnimation/LoadAnimation.jsx";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {execute, data, loading, error: fetchError} = useFetch();
    const navigate = useNavigate();

    const handleLogin = async(e) => {

        e.preventDefault();
        if(!(email && password)){
            setError("Please fill out fields");
            return;
        }

        const body = {email, password};

        const result = await execute("post", "/login", body);

        if(result) {
            localStorage.setItem("token", result.token);
            navigate("/dashboard/home");
        } 
        
    }
    return (
        <>
            <form onSubmit={handleLogin} className="login-form">
                <AuthInput setValue={setEmail} value={email} height={30}  type="email" placeholder="Enter your email" />
                <AuthInput setValue={setPassword} value={password} height={30} type="password" placeholder="Enter your password" />
                {(error || fetchError) && <p className="error-message" >{error || fetchError}</p> }
                <div className="auth-btn-wrapper" style={{height: "30%"}}>
                    <button type="submit" className="auth-btn" >
                         {loading ? <LoadAnimation height={"90%"} width={"10%"} /> : "Log In"}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login;