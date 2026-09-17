import "./Board.css"

function Board({width, height, title, completion, members, updated}) {

    const size = {
        height: height,
        width: width
    }
    return (
        <>
        <div className="board" style={size}>

        </div>
        </>
    )
}

export default Board;