import { useEffect } from "react";
import "./Kanban.css"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadAnimation from "../../components/loadAnimation/LoadAnimation";
import Column from "../../components/column/Column";

function Kanban() {


    const {execute, data, loading, error} = useFetch();
    const {boardId} = useParams();

    useEffect(() => {
        const fetchFullBoard = async () => {
            await execute("get", `/board/full/${boardId}`);
        }

        fetchFullBoard();
    }, [])
    return (
        <>
        <div className="kanban-board">
            <div className="kanban-nav">
                <h1 className="kanban-title">{data?.name}</h1>
                <button className="add-column">
                    Add Column
                </button>
            </div>
            {loading && <LoadAnimation width={"10%"} height={"20%"} />}
            {error && <p className="error-message">{error}</p>}
            <div className="kanban-grid">
                {data?.columns.map((column) => {
                    return (
                        <Column 
                        key={`${column?.name}${column?.id}`}
                        details={column}
                        />
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Kanban;