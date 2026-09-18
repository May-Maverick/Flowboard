
import "./CompletionBar.css"


function CompletionBar({height, width, details}) {

    
    let colors;

    if(details?.blocked_count > 0) {
        colors = ["var(--status-blocked)", "var(--border)", "var(--border)"];
    } else if(details?.in_progress_count > 0) {
        colors = ["var(--status-progress)", "var(--status-progress)", "var(--border)"];
    } else if(details?.done_count > 0) {
        colors = ["var(--status-done)", "var(--status-done)", "var(--status-done)"];
    } else {
        colors = ["var(--border)", "var(--border)", "var(--border)"];
    }

    const size = {
        height: height,
        width: width
    }

    return (
        <>
            <div className="completion-bar" style={size}>
                {colors?.map((color, index) => {
                    return (
                        <div key={`${color}${index}`} className="bar" style={{backgroundColor: color}}>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CompletionBar;