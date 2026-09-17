import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./layout/authLayout/Auth.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./layout/dashboardLayout/Dashboard.jsx";
import Home from "./pages/home/Home.jsx";
import Members from "./pages/members/Members.jsx";
import Settings from "./pages/settings/Settings.jsx";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace/>} />
      <Route path="/auth" element={ <Auth />} >
        <Route path="signup" element={ <SignUp />} />
        <Route path="login" element= {<Login />} />
      </Route>
      <Route element={<ProtectedRoute />} >
        <Route path="/workspaces" element={<Dashboard />}>
          <Route path=":workspaceId" element={<Home />} />
          <Route path=":workspaceId/board/:boardId"  />
          <Route path=":workspaceId/members" element={<Members />}/>
          <Route path="settings" element={<Settings/>} />
        </Route>
      </Route> 
    </Routes>
    </>
  )
}

export default App;