import { useState } from "react";
import "./Card.css"

function Card({details}) {

    const [isExpanded, setIsExpanded] = useState(false);

    let color;
    switch (details?.priority) {
        case "High" : {
            color = "var(--status-blocked)";
            break;
        }

        case "Medium" : {
            color = "var(--status-progress)";
            break;
        }

        case "Low" : {
            color = "var(--status-done)";
        }

    }

    const colorStyle = {
        backgroundColor: isExpanded ? "rgba(116, 112, 112, 0.397)" : color
    }

    return (
        <>
        <div 
            className={isExpanded ? "card-wrapper expanded": "card-wrapper"} 
            style={colorStyle} 
            onClick={() => setIsExpanded(prev => !prev)}>
                
            <div className="card">
                <div className="card-title">
                    {isExpanded ? <h2>{details?.title}</h2> : <p>{details?.title}</p>}
                </div>
                {isExpanded && <div> </div>}
            </div>
        </div>
        </>
    )
} 

export default Card;