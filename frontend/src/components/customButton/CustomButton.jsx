import "./CustomButton.css"

function CustomButton({height, width, fn, bgcolor,textcolor, label, icon}){

    const size = {
        height: height,
        width: width,
        backgroundColor: bgcolor,
        color: textcolor

    }


    return (
        <>
        <button className="custom-button" style={size} onClick={fn}>
            <div className="btn-label">
                {label}
            </div>
            <div className="btn-icon">
                {icon}
            </div>
        </button>
        </>
    )
}