import { useState } from "react";
import Dropdown from "../dropdown/Dropdown.jsx";
import "./Sidebar.css"
import { useNavigate, useParams } from "react-router-dom";

function Sidebar({workspaces, isCollapsed, toggleCollapse}) {

  
    const navigate = useNavigate();
    
    const workspaceNames = workspaces.map(workspace => workspace.name);

    const {workspaceId} = useParams();
    const workspaceName = (workspaces.find(workspace => String(workspace.id) === workspaceId))?.name;
  

    const changeUrl = (option) => {
        
        const id = (workspaces.find(workspace => workspace.name === option)).id;
        navigate(`/workspaces/${id}`);
   
    }

    const size = {
        height: "55px",
        width: "220px"
    }

   

    return (
        <>
        <div className={isCollapsed ? "sidebar sidebar-collapsed" : "sidebar"}>
            <div className="sidebar-title">
                {!isCollapsed && <h2>Flowboard</h2>}
            </div>
            <button className="collapse-sidebar" onClick={toggleCollapse}>
                <span className={isCollapsed ? "collapse-icon flipped" : "collapse-icon"}>‹</span>
            </button>
            <div className="sidebar-options-wrapper">
                <div className="sidebar-options">
                    {!isCollapsed && (
                        <Dropdown height={"40px"} width={"225px"} value={workspaceName} setValue={changeUrl} options={workspaceNames} />
                    )}
                </div>
                <div className="sidebar-account">
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;

