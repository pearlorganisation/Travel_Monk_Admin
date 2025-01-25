import { jwtDecode } from "jwt-decode";  
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/Actions/authAction";
import  Cookies  from 'js-cookie'

 
 

const useTokenExpiry = () => {
    const dispatch = useDispatch();
    const accessToken = Cookies.get("access_token");
    const tokenExpiresAt = parseInt(Cookies.get("Expires"), 10);  
     
    useEffect(() => {
        console.log("Access token:", accessToken);

     console.log("token expires at", tokenExpiresAt)    
        if (tokenExpiresAt) {
            const timeLeft = tokenExpiresAt - Date.now();  
            if (timeLeft > 0) {
                const logoutTimer = setTimeout(() => {
                    console.log("Token expired, logging out...");
                    dispatch(adminLogout());  
                }, timeLeft);

                 
                return () => clearTimeout(logoutTimer);
            } else {
                 
                dispatch(adminLogout());
            }
        }
    }, [dispatch, tokenExpiresAt]);
};

export default useTokenExpiry;
