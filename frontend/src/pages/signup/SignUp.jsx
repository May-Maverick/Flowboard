import "./SignUp.css"
import AuthInput from "../../components/authInput/AuthInput.jsx";
import {  useState } from "react";
import { checkPasswordStrength } from "../../hooks/helperFunctions.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import LoadAnimation from "../../components/loadAnimation/LoadAnimation.jsx";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const [error, setError] = useState("");
   

    const {execute, data, loading, error: fetchError} = useFetch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(!(firstName && lastName && email && password && confirmPassword)){
            setError("Please complete fields");
            return;
        }

        if(!checkPasswordStrength(password)){
            setError("Password too weak");
            return;
        }

        if(password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        const body = {firstName, lastName, email, password};

        const result = await execute("post", "/signup", body);

        if(result) {
            localStorage.setItem("token", result.token);
            navigate("/dashboard/home");
        } 
        

    }

    return (
        <>
        <form onSubmit={handleSignup} className="signup-form">
            <div className="names">
               <AuthInput setValue={setFirstName} value={firstName}  width={48} placeholder="Enter first name" />
               <AuthInput setValue={setLastName} value={lastName} width={48} placeholder="Enter last name" />
            </div>
            <AuthInput setValue={setEmail} value={email} height={20} type="email" placeholder="Enter email" />
            <AuthInput setValue={setPassword} value={password} height={20} type="password" placeholder="Enter password" />
            <AuthInput setValue={setConfirmpassword} value={confirmPassword} height={20} type="password" placeholder="Confirm password" />
            {(error || fetchError) && <p className="error-message" >{error || fetchError}</p> }
            <div className="auth-btn-wrapper" style={{height: "20%"}}>
                <button className="auth-btn" type="submit">
                    {loading ? <LoadAnimation height={"90%"} width={"10%"} /> : "Sign Up"}
                    </button>
            </div>
        </form>
        </>
    )
}

export default SignUp;