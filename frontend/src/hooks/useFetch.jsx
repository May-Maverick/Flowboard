import { useState } from "react";


function useFetch() {
    const[data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function execute(method, api, body) {
        setLoading(true);
        setError("");
        try {
            const options = {
                method: method.toUpperCase(),
                headers: {

                }
            }

            const token = localStorage.getItem("token");
            if (token) {
                options.headers["Authorization"] = `Bearer ${token}`;
            }
            if (method.toUpperCase() !== "GET") {
                options.headers["Content-Type"] = "application/json";
            }

            if(body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`http://localhost:5000${api}`, options);
            
            const responseData = await response.json();

            if(!response.ok) {
                setError(responseData.message);
                return null;
            }

            setData(responseData);
            return responseData;


        } catch(err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }



    return {execute, data, loading, error};


}

export default useFetch;