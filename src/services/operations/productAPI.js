import { useDispatch } from "react-redux";
import { apiConnector } from "../apiconnector";
import { productEndPoint } from "../apis";
import { addProduct } from "../../slices/productSlice";

const {
    ADDPRODUCT_API,
    GETALLPRODUCT_API,
    DELETEPRODUCT_API,
    GETSPECIFICDETAIL_API,
    UPDATEPRODUCT_API,
} = productEndPoint;

export function addNewProduct(formData,navigate,token){
    return async (dispatch)=> {
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
    console.log("add product api is : ",ADDPRODUCT_API);
    try {
        const response = await apiConnector("POST", ADDPRODUCT_API, formData,headers);
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        console.log("response in product API is ; ",response);
        dispatch(addProduct(response.data.product)); 
        navigate("/adminhome/products");
      } catch (error) {
        console.log("ADD PRODUCT API ERROR............", error);
      }
    }
}

export const fetchAllProducts = async(token)=>{
    console.log("Get All product API is : ",GETALLPRODUCT_API);
    

    console.log("Token in fetchAllProducts : ",token);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    try{
        const response = await apiConnector("GET", GETALLPRODUCT_API,token,headers);

        if(!response.data.success){
            return new Error(response.data.message);
        }

        console.log(response.data.products);
        return response.data.products
    }catch(error){
        console.log("FETCH PRODUCT API ERROR............", error);
    }
}

export const deleteProduct = async(id,token)=>{
    console.log("Delete Product API is",DELETEPRODUCT_API);

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    try{
        const response = await apiConnector("DELETE",DELETEPRODUCT_API,{id},headers);
        if(!response.data.success){
            return new Error(response.data.message);
        }

        return;

    }catch(error){
        console.log("Delete Product API Error ....... ",error);
    }
}

export const getSpecificDetail = async(id,token)=>{

    console.log("GETSPECIFICDETAIL_API is " ,`${GETSPECIFICDETAIL_API}/${id}`);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    try{
        const response = await apiConnector("GET",`${GETSPECIFICDETAIL_API}/${id}`,token,headers);
        // console.log("Hello");
        console.log("response is  ........",response);
        if(!response.data.success){
            return new Error(response.data.message);
        }

        console.log("get Specific Details :",response );
        return response.data.productDetails;

    }catch(error){
        console.log("Get specific Product API Error ....... ",error);
    }
}

export function updateProduct(formData,navigate,id,token){
    return async(dispatch)=>{
        console.log("Update product api is : ",UPDATEPRODUCT_API);
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        try{
            const response = await apiConnector('PUT',`${UPDATEPRODUCT_API}/${id}`,formData,headers);

            console.log("response is  ........",response);

            if(!response.data.success){
                return new Error(response.data.message);
            }

            console.log("get Specific Details :",response );
            navigate("/adminhome/products");
            return response.data.product;
        }catch(error){
            console.log("Update Product API Error ....... ",error);
        }
    }
}