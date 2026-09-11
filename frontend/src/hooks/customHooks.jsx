import { useEffect, useState, useRef } from "react";

export function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue);

    function setFalse() {
        setValue(value => false);
    }

    function setTrue() {
        setValue(value => true);
    }


    function toggle() {
        setValue(value => !value);
    }
    

    return {value, toggle, setTrue, setFalse};
}

export function useLocalStorage(key, value) {

    function addToLocalStorage() {
        localStorage.setItem(key, value);
    }

    useEffect(() => {
        addToLocalStorage();
    }, [value]);


}

export function useElementAttribut(attribute, value) {

    function setAttribute() {
        document.documentElement.setAttribute(attribute, value);
    }

    useEffect(() => {
        setAttribute();
    }, [value]);

}


export function useDebounce(currentSearch, timeDelay) {

    const [debounceValue, setDebounceValue] = useState("");
    const [timer, setTimer] = useState(null);
    
    function debounce() {
        setTimer(timer => {
            const timerId = setTimeout(()=> {
                setDebounceValue(currentSearch);
            }, timeDelay);

            return timerId;
        })
    }

    useEffect(() => {
        clearTimeout(timer);
        debounce();
    }, [currentSearch]);


    return debounceValue;
}


export function usePrevious(value) {

    const [previousValue, setPreviousValue] = useState(null);
    const [currentValue, setCurrentValue] = useState(value);

    function update() {
        setPreviousValue(currentValue);
        setCurrentValue(value);
    }

    useEffect(() => {
        update();
    }, [value]);

    return previousValue;
}


export function useDebounceLocalStorage(key, changingValue, delay){

    const [value, setValue] = useState(changingValue);
    const timer = useRef(null);

    function timeDelay() {
        timer.current = setTimeout(()=> {
            setValue(changingValue); 
            localStorage.setItem(key, changingValue);
        }, delay);       
    }

    useEffect(() => {
        clearTimeout(timer.current);
        timeDelay();

    }, [changingValue]);


    return value;
}

export function usePreviousToggle() {


    const [previousToggles, setPreviousToggles] = useState([]);
    const [currentToggle, setCurrentToggle] = useState(true);

    function setTrue() {
        setCurrentToggle(true);
        setPreviousToggles(previousToggles => [...previousToggles, currentToggle]);
    }

    function setFalse() {
        setCurrentToggle(false);
        setPreviousToggles(previousToggles => [...previousToggles, currentToggle]);
    }

    function toggle() {
        setCurrentToggle(currentToggle => !currentToggle);
        setPreviousToggles(previousToggles => [...previousToggles, currentToggle]);
    }

    
    return {currentToggle, previousToggles, setFalse, setTrue, toggle};
    
}



