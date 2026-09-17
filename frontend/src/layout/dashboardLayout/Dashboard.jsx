import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

function Dashboard() {

    
    const [workspaces, setWorkspaces] = useState([]);

    const {execute, loading, error} = useFetch();
    const navigate = useNavigate();
    useEffect(() => {
         
         async function fetchWorkspaces() {
            const data = await execute("get", "/workspace");

            if(data) {
                setWorkspaces(data);
                navigate(`/workspaces/${data[0].id}`);
            }
         }

         fetchWorkspaces();

    }, []);

    return (
        <>
        <div className="dashboard">
            <div className="sidebar-wrapper">
                <Sidebar workspaces={workspaces} />
            </div>
                
            <div className="outlet-wrapper">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Dashboard;