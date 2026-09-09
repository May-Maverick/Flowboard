
import { Fragment } from "react"
import "./SegmentedButton.css"


function SegmentedButton({width, height, setValue, value, options, name}) {
    const index = options.indexOf(value);

    const size = {
        width: `${width}px`,
        height: `${height}px`
    }

    const btnSize = {
        width: `${100/options.length}%`
    }

    const selectorSize = {
        width: `${(100/options.length)}%`,
        transform: `translateX(${index*100}%)`
    }

    return (
        <>
        
        <div className="segmented-btn" style={size}>
            {options.map((option) => {
                const id = `${name}-${option}`;
               return(
                <>
                <Fragment key={option}>
                <input
                    name={name}
                    id={id}
                    type="radio"
                    checked={option === value} 
                    onChange={() => setValue(option)}
                />
    
                <label htmlFor={id} style={btnSize}>{option}</label>
                </Fragment>
                </>
               ) 
            })}
            <div className="selector-slot" style={selectorSize}>
                <div className="selector" ></div>
            </div>
        </div>
    
        </>
    )
}

export default SegmentedButton;