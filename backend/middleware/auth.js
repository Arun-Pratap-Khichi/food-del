import jwt from "jsonwebtoken"

const authmiddleware = async (req,res,next) => {

try{
    const {token} = req.headers;
console.log(token)
console.log(process.env.JWT_SECRET)
if(!token) {
    return res.json({success:false,message:"Not Authorized Login Again"})
}
    
    const token_decode =  jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
}
catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

export default authmiddleware;