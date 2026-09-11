

export const checkPasswordStrength = (password) => {

 
    
    if(password.length === 0){
        return false;
    }

    if(password === password.toLowerCase()){
        return false;
    }

    if(!(/\d/.test(password))) {
        return false;
    }

    if(!(/[^a-zA-Z0-9]/.test(password))){
        return false;
    }

    return true;
}