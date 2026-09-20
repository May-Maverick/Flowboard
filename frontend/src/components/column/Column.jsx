import { useState } from "react";
import Card from "../card/Card";
import "./Column.css"
import AuthInput from "../authInput/AuthInput";

function Column({details}) {

    const [addCard, setAddCard] = useState(false);
    const [cardTitle, setCardTitle] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const [cardPriority, setCardPriority] = useState("High");
   
    const priority = [
        {
            name: "High", 
            color: "var(--status-blocked)",
            bgColor: "var(--status-bg-blocked)"
        },
        {
            name: "Medium", 
            color: "var(--status-progress)",
            bgColor: "var(--status-bg-progress)"
        }, 
        {
            name: "Low", 
            color: "var(--status-done)",
            bgColor: "var(--status-bg-done)"
        }
       
    ];
    let type;
    switch (details?.type) {
        case "todo" : {
            type = {
                color : "var(--status-todo)",
                name: "To do"
            }
            break;
        }
        case "in_progress" : {
            type = {
                color : "var(--status-progress)",
                name: "In progress"
            }
          
            break;
        }
        case "done" : {
            type = {
                color : "var(--status-done)",
                name: "Done"
            }
     
            break;
        }
        case "blocked" : {
            type = {
                color : "var(--status-blocked)",
                name: "Blocked"
            }
            break;
        }
    }



    return (
        <>
        <div className="kanban-status-color" style={{backgroundColor: type.color}}>

      
        <div className="kanban-column">
            <div className="column-title">
                <h3 className="column-name">{details?.name}</h3>
                <h3 className="column-card-limit">{details?.cards.length}</h3>
            </div>
            <div className="cards">
                {details?.cards.map(card => {
                    <Card
                    key={`${card?.title}${card?.id}`}
                    details={card}
                    />
                })}
                <div className="add-card" onClick={() => setAddCard(true)}>
                   <p>Add card</p>
                </div>
                {addCard && <div className="add-card-popup-wrapper">
                    <div className="add-card-popup">
                        <div className="add-card-title">
                            <p>{type.name}</p>
                            <h2>New card</h2>
                        </div>
                        <div className="add-card-title-input">
                            <label htmlFor="newcard-title">Title</label>
                            <AuthInput 
                            name="newcard-title"
                            setValue={setCardTitle} 
                            value={cardTitle}
                            width={100}
                            height={90}
                            placeholder="Set up auth routes" />
                        </div>
                        <div className="add-card-description">
                            <label htmlFor="newcard-description">Description</label>
                            <textarea
                                className="auth-input"
                                name="newcard-description" 
                                onChange={(e) => setCardDescription(e.target.value)} 
                                value={cardDescription} 
                                placeholder="Add a more detailed description" >
                            </textarea>
                        </div>
                        <div className="add-card-extra">
                            <div className="add-card-priority">
                                <p>Priority</p>
                                <div className="card-priority-wrapper">
                                    <div 
                                        className={cardPriority === "High" ? "card-priority high" : "card-priority"}
                                        onClick={() => setCardPriority("High")}
                                    >
                                        <p>High</p>
                                    </div>
                                    <div 
                                        className={cardPriority === "Medium" ? "card-priority medium" : "card-priority"}
                                        onClick={() => setCardPriority("Medium")}
                                    >
                                        <p>Medium</p>
                                    </div>
                                    <div 
                                        className={cardPriority === "Low" ? "card-priority low" : "card-priority"}
                                        onClick={() => setCardPriority("Low")}
                                    >
                                        <p>Low</p>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="add-card-duedate">

                            </div>
                        </div>
                    </div>
                </div> }
            </div>
        </div>

        </div>
        </>
    )
}

export default Column;