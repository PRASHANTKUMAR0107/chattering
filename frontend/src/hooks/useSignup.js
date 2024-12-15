import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async({fullName,username,password,confirmpassword,gender}) =>{
        const success = handleInputErrors({fullName,username,password,confirmpassword,gender});
        if(!success) return;

        setLoading(true);
        try {
            console.log(fullName);
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName,username,password,confirmpassword,gender})
            })
            
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            // console.log(data);
            //loacalstorage
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { signup, loading };
}

export default useSignup;

const handleInputErrors = ({fullName,username,password,confirmpassword,gender}) => {
    if(!fullName || !username || !password || !confirmpassword || !gender){
        toast.error("Please fill all the fields.");
        return false;
    }
    if(password!==confirmpassword){
        toast.error("Passwords do not match.")
        return false;
    }
    if(password.length<6){
        toast.error("Password should be at least 6 characters.")
        return false;
    }
    return true;
}