import { useState } from "react";
import AuthInput from "../authInput/AuthInput";
import "./NewBoard.css"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadAnimation from "../loadAnimation/LoadAnimation";

function NewBoard({setisShowing}) {

    const [boardName, setBoardName] = useState("");
    const {execute, error, loading} = useFetch();
    const {workspaceId} = useParams();
    async function handleClick() {
        const body = {workspaceId, boardName};
        await execute("post", "/board", body);
        if(!error && !loading) {
            setisShowing(false);
        }
    }
    return (
        <>
        <div className="newboard-wrapper">
            <div className="newboard">
                <div className="newboard-title">
                    <h2>New Board</h2>
                    <p>Give your board a name.</p>
                </div>
                <div className="newboard-input">
                    <label htmlFor="newboard-name">Board name</label>
                    <AuthInput 
                    name="newboard-name"
                    setValue={setBoardName} 
                    value={boardName}
                    width={100}
                    height={90}
                    placeholder="e.g Business portfolio" />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="newboard-buttons">
                    <button className="newboard-cancel" onClick={() => setisShowing(false)}>Cancel</button>
                    <button 
                        className="newboard-create" 
                        onClick={handleClick}>{loading ? <LoadAnimation height={"90%"} width={"30%"} /> : "New Board"}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default NewBoard;