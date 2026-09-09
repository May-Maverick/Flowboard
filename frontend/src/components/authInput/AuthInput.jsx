import "./AuthInput.css"

function AuthInput({setValue, value, width = 100, height=100, type="text", placeholder=""}) {


    const size = {
        width: `${width}%`,
        height: `${height}%`
    }

    return (
        <>
            <input className="auth-input"
            type={type} 
            onChange={(e) => setValue(e.target.value)} 
            value={value} 
            placeholder={placeholder} 
            style= {size} />
        </>
    )
}

export default AuthInput;