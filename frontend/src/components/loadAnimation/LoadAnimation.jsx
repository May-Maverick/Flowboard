import "./LoadAnimation.css";
import "./LoadAnimation.css"
function LoadAnimation({height, width}) {


    const style = {
        height: height,
        width: width
    };

    return (
        <>
            <div className="load-wrapper" style={style}>
                <div className="load-bar"></div>
                <div className="load-bar"></div>
                <div className="load-bar"></div>
            </div>
        </>
    )
}

export default LoadAnimation;