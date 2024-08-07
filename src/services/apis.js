const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login",
}

export const productEndPoint = {
    ADDPRODUCT_API : BASE_URL + "/addnewproduct",
    GETALLPRODUCT_API : BASE_URL + "/getallproduct",
    DELETEPRODUCT_API : BASE_URL + "/deleteproduct",
    GETSPECIFICDETAIL_API : BASE_URL + "/getspecificdetail",
    UPDATEPRODUCT_API : BASE_URL + "/updateproduct",
}