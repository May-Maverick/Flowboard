import { useNavigate, useParams } from "react-router-dom";
import CompletionBar from "../completionBar/CompletionBar";
import "./Board.css"
import { formatDistanceToNow } from "date-fns";

function Board({width, height, details}) {

    const navigate = useNavigate();
    const {workspaceId} = useParams();

    const size = {
        height: height,
        width: width
    }

    const updatedText = details?.updated_at
    ? `Updated ${formatDistanceToNow(new Date(details.updated_at), { addSuffix: true })}`
    : "";

    const boardClick = (id) => {
        navigate(`/workspaces/${workspaceId}/board/${id}`);
    }

    return (
        <>
        <div className="board" style={size} onClick={() => boardClick(details?.board_id)}>
            <CompletionBar width={"90%"} height={"11%"} details={details} />
            <div className="board-name">
                <h2>{details?.board_name}</h2>
            </div>
            <div className="board-last-update">
                <p>{updatedText} </p>
            </div>
        </div>
        </>
    )
}

export default Board;