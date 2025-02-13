import foodModel from "../models/foodModel.js";
import fs from 'fs' 

// add new food_item in DB

const addFood = async (req,res) =>{ 
    
    try{

        let image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
        })
       await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


// all food list

const listFood = async (req,res) => {
        try{
              const foods = await foodModel.find({});
              res.json({success:true,data:foods})
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}

//  remove food item

const removeFood = async (req,res) => {
try{  // to find the foodmodel by id
      const food = await foodModel.findById(req.body.id);
      // for delete the image from uploads folder
      fs.unlink(`uploads/${food.image}`,()=>{}) 

      // food data will be deleted from the DB
      await foodModel.findByIdAndDelete(req.body.id);
   res.json({success:true,message:"food remove successfull"})
}
catch(error){
    console.log(error)
  res.json({success:false, message:"Error"})
}
}




export {addFood,listFood,removeFood}
     