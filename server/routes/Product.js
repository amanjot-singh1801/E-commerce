const express = require("express");
    const router = express.Router();
    const {auth, isAdmin} = require("../middlewares/auth");
    const {addNewProduct , getAllProducts , deleteProduct,getSpecificDetail,updateProduct} = require("../controllers/Product");

    router.post("/addnewproduct",auth,isAdmin,addNewProduct);
    router.get("/getallproduct",auth,getAllProducts);
    router.delete("/deleteproduct",auth,isAdmin,deleteProduct);
    router.get("/getspecificdetail/:id",auth,getSpecificDetail);
    router.put("/updateproduct/:id",auth,isAdmin,updateProduct);
    // router.post("/check",auth,isAdmin,(req,res)=>{
    //     console.log("hello ji ");
    //     return res.status(200).json({
    //         success:true,
    //         message:"All okk"
    //     });
// })
module.exports = router;