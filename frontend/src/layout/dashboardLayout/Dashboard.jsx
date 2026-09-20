import { Navigate, Outlet, useMatch, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

function Dashboard() {

    
    const [workspaces, setWorkspaces] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isBoardRoute = Boolean(useMatch("/workspaces/:workspaceId/board/:boardId"));

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


    useEffect(() => {
        setIsCollapsed(isBoardRoute);
    }, [isBoardRoute]);


    const toggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    }

    return (
        <>
        <div className="dashboard">
            <div className={isCollapsed ? "sidebar-wrapper collapsed" : "sidebar-wrapper"}>
                <Sidebar workspaces={workspaces} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
            </div>
                
            <div className="outlet-wrapper">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Dashboard;