import { redirect } from "react-router-dom";
import "./CompletionBar"

function CompletionBar({height, width, level}) {

    
    const color = {
        backgroundColor: () => {
            if(level === 1){
                return "var(--status-blocked);";
            } if (level === 2){
                return "var(--status-progress);";
            }

            return "var(--status-done);"
        }
    }

    const size = {
        height: height,
        width: width
    }

    return (
        <>
            <div className="completetion-bar" style={size}>
                <div className={level === 1 ? "bar-colored" : "bar"} >

                </div>
                <div className={level === 2 ? "bar-colored" : "bar"}>

                </div>
                <div className={level === 1 ? "bar-colored" : "bar"} style={}>

                </div>
            </div>
        </>
    )
}

export default CompletionBar;