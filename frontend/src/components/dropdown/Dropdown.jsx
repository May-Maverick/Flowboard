import { useState } from "react";
import "./Dropdown.css";

function Dropdown({height, width, value, setValue, options}){

    const [isOpen, setIsOpen] = useState(false);

    const size = {
        height: height,
        width: width
    }

    const offset = {
        transform: `translateY(-${100/options.length}%)`
    };

    const handleClick = (option) => {
        setValue(option);
        setIsOpen(false);
    }


    return (
        <>
        <div className="dropdown" style={size}>
            <button 
                onClick={() => setIsOpen(isOpen => !isOpen)}
                className={isOpen ? "disable": ""}
            >
                {value}
            </button>
            <div className={isOpen? "options-visible" : "options"} style={offset}>
                {options.map(option => {
                    const isSelected = value === option;
                    return (
                        <div 
                            key={option}
                            className={isSelected ? "option-selected": "option"}
                            style={size}
                            onClick={() => handleClick(option)}

                        >
                            {option}
                        </div>
                    )
                })}
            </div>
        </div>
        </>

    )
}

export default Dropdown;