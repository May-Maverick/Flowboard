import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css"
import SegmentedButton from "../../components/segmentedButton/SegmentedButton.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme } from "../../hooks/helperFunctions.jsx";

function Auth() {

    const [theme, setTheme] = useState("Light");
    const [authPage, setAuthPage] = useState("Login");
    const themes = ["Light", "Dark"];
    const authPages = ["Login", "Signup"];
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        toggleTheme(theme);
    }, [theme]);


    useEffect(() => {
        navigate(`/auth/${authPage.toLowerCase()}`);
    }, [authPage]);

    return (
        <>
        <div className="auth-background">
            <div className="auth-nav">
                <SegmentedButton width={200} height={40} setValue={setTheme} value={theme} options={themes} name={"theme"} />
                <SegmentedButton width={200} height={40} setValue={setAuthPage} value={authPage} options={authPages} name={"authPage"} />
            </div>
            <div className="auth-form-container">
                <motion.div className="auth-form" layout transition={{ duration: 0.35, ease: "easeInOut" }}>
                    <div className="auth-greeting">
                        <h2>Welcome to Flowboard</h2>
                        <p>Get work done</p>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
        </>
    )
}

export default Auth;