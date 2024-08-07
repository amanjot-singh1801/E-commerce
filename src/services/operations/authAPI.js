import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { setToken, setUserType } from "../../slices/authSlice";
import { authEndPoints } from "../apis";
import { resetCart } from "../../slices/cartSlice";


const {
    SIGNUP_API, LOGIN_API
} = authEndPoints;

export const addUser = async ({yourname,username,password,email,navigate}) => {

    console.log("SIGNUP API IS : " ,SIGNUP_API);
    try{
        const response = await apiConnector("POST", SIGNUP_API, {
            yourname,
            username,
            password,
            email,
          })

          if (!response.data.success) {
            throw new Error(response.data.message)
          }
          navigate("/login")
    }catch(error){
        console.log("SIGNUP API ERROR............", error)
    }
}

export function loginUser ({email,password,navigate}){
    return async(dispatch)=>{
    console.log("LOGIN API IS : " ,LOGIN_API);
    try{
        const response = await apiConnector("POST",LOGIN_API,{
            email,
            password,
        })

        console.log("response : ",response);
        console.log("Token is : ",response.data.token);
        // console.log(response.data.user);

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));  
        localStorage.setItem("userType", JSON.stringify(response.data.user.accountType)); 

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(setUserType(response.data.user.accountType));
        dispatch(setToken(response.data.token));
        
        if(response.data.user.accountType === "admin"){
            navigate("/adminhome");
        }
        else{
            navigate("/home");
        }

    }catch(error){
        console.log("LOGIN API ERROR............", error)
    }
}
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/login")
    }
  }