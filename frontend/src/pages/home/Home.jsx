import { useState } from "react";
import "./Home.css"
import Board from "../../components/board/Board";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadAnimation from "../../components/loadAnimation/LoadAnimation";
import NewBoard from "../../components/newBoard/NewBoard";

function Home() {

    const [search, setSearch] = useState("");
    const [newBoard, setNewBoard] = useState(false);
   

   

    const {execute, data, error, loading} = useFetch();
    const {workspaceId} = useParams();

    useEffect(() => {
        async function fetchBoards() {
            const result = await execute("get", `/board/${workspaceId}`);
            
        }

        fetchBoards();
    }, [workspaceId]);

    
    return (
        <>
        <div className="boards-wrapper">
            <div className="board-nav">
                <div className="board-title">
                    <h1>Boards</h1>
                </div>
                <div className="board-form-wrapper">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Search boards" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <button className="add-board" onClick={() => setNewBoard(true)}>
                        Add board
                    </button>

                </div>
            </div>
            <div className="boards-grid">
                {loading && <LoadAnimation height={"50px"} width={"160px"} />}
                {error && <p className="error-message">{error}</p> }
                {!loading && !error && data?.length === 0 && <p className="no-boards">No Boards</p> }
                {newBoard && <NewBoard setisShowing={setNewBoard} />}
                {data?.map(board => {

                    return (
                        <Board key={board?.board_id} width={"300px"} height={"150px"} details={board} />
                    )
                })}
            </div>
        </div>
        </>
    )

}

export default Home;