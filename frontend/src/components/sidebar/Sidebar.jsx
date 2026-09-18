import { useState } from "react";
import Dropdown from "../dropdown/Dropdown.jsx";
import "./Sidebar.css"
import { useNavigate, useParams } from "react-router-dom";

function Sidebar({workspaces}) {

  
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
        <div className="sidebar">
            <div className="sidebar-title">
                <h2>Flowboard</h2>
            </div>
            <div className="sidebar-options-wrapper">
                <div className="sidebar-options">
                    <Dropdown height={"40px"} width={"225px"} value={workspaceName} setValue={changeUrl}  options={workspaceNames} />
                  
                </div>
                <div className="sidebar-account">

                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;

