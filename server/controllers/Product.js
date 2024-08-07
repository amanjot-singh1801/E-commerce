const product = require("../models/Product");
const path = require('path');
exports.addNewProduct = async(req,res) =>{
   
    try{
        const {productName , price , productDescription, category } = req.body;
        
        const file = req.files.productImage;
        console.log("Product Image is : ",file);
        console.log("Product Name is : ",productName);
        console.log("Product Price is : ",price);
        console.log("Product Category is : ",category);
        console.log("Product Description is : ",productDescription);
        
        if(!productName || !price || !productDescription || !category || !file){
            return res.status(400).send({
                success: false,
                message: "All Fields are required",
            }); 
        }

        const filePath = path.join(__dirname, "../../public/files", `${Date.now()}.${file.name.split('.').pop()}`);
        console.log("Path --> 0", filePath);

        // add path to the move function 
        file.mv(filePath,(err)=>{
            console.log(err);
        } );

        const fileName = path.basename(filePath);

        const response = await product.create({
            productName,
            productDescription,
            price,
            category,
            image:fileName,
        })

        return res.status(200).json({
            success:true,
            message:"Product added Successfully",
            product:response,
        })

    }catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "Product cannot be added.",
		});
    }

}


exports.getAllProducts = async(req,res) =>{
    try{
        const response = await product.find();
        if(!response){
            return res.status(204).json({
                success:false,
                message:"There are no products",
            })
        }

        return res.status(200).json({
            success:true,
            message:"fetch products successfully",
            products:response,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot Fetched all the products",
        })
    }
}

exports.deleteProduct = async (req,res) => {
    try{
        const { id } = req.body;
        // console.log("ID is " ,id);

        const deleteProduct = await product.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
            deleteProduct:deleteProduct,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue during deleted product",
        })
    }
}

exports.getSpecificDetail = async(req,res)=>{
    try{
        const {id} = req.params;
        const productDetails = await product.findById({_id:id});
        
        if(!productDetails){
            return res.status(404).json({
                success:false,
                message:"No Product Found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Product Found",
            productDetails:productDetails,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue During Fetch the Specific Product",
        });
    }
}

exports.updateProduct = async(req,res)=>{

    try{
        const {id} = req.params;
        const {productName , price , productDescription, category } = req.body;
        console.log("productName :",productName)
        console.log("productName :",productDescription);
        console.log("productName :",price);
        console.log("productName :",category);

        
        if(!productName || !price || !productDescription || !category ){
            return res.status(400).send({
                success: false,
                message: "All Fields are required",
            }); 
        }
        
        const file = req.files?.productImage;
        var response = null;

        if(!file){
            response = await product.findByIdAndUpdate(
                id,
                {
                    productName,
                    productDescription,
                    price,
                    category,
                },
                { new: true } 
            );
        }
        else{
            const filePath = path.join(__dirname, "../../public/files", `${Date.now()}.${file.name.split('.').pop()}`);
            console.log("Path --> 0", filePath);

            file.mv(filePath,(err)=>{
                console.log(err);
            } );
            
            const fileName = path.basename(filePath);

            response = await product.findByIdAndUpdate(
                id,
                {
                    productName,
                    productDescription,
                    price,
                    category,
                    image:fileName,
                },
                { new: true } 
            );
        }
        
        return res.status(200).json({
            success:true,
            message:"Product Updated Successfully",
            product:response,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue During Updating the Product",
        });
    }
}