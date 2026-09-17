import { useState } from "react";
import "./Home.css"
import Board from "../../components/board/Board";

function Home() {

    const [search, setSearch] = useState("");

    const handleSearch = () => {

    }
    return (
        <>
        <div className="boards-wrapper">
            <div className="board-nav">
                <div className="board-title">
                    <h1>Boards</h1>
                </div>
                <div className="board-form-wrapper">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Search boards" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <button className="add-board">
                        Add board
                    </button>

                </div>
            </div>
            <div className="boards-grid">
                <Board height={"200px"} width={"400px"}/>
            </div>
        </div>
        </>
    )

}

export default Home;