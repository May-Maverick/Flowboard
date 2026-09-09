import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./layout/authLayout/Auth.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Login from "./pages/login/Login.jsx";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/auth" element={ <Auth />} >
        <Route path="signup" element={ <SignUp />} />
        <Route path="login" element= {<Login />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;