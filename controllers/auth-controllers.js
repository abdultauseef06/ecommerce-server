const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const home = async(req,res)=>{
    try {
        res.status(200).send("yubi apparels using controlles")
    } catch (error) {
        console.log(error)
    }
}
//registration

const register = async (req,res)=>{
    try {
        console.log(req.body)
        const { username,email,phone,password} = req.body
        const userExist =  await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({msg:"email already exist"})
        }
        const userCreated = await User.create({username,email,phone,password});
        res.status(200).json({msg:"registration sucessful",token:await userCreated.generateToken(),userId:userCreated._id.toString()})
    } catch (error) {
    res.status(500).json("internal server error")
}
}

// Login logic
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userExist =await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Email Do Not Exist"});

        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (isPasswordValid)  
        {
            res.status(200).json({msg:"registration sucessful",
            token:await userExist.generateToken(),
            userId:userExist._id.toString()})
        }
        else
        {
            res.status(401).json({message:"wrong password"});
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during login',
            error: error.message,
        });
    }
}

const user = async (req,res)=>{
    try {
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({userData})
    } catch (error) {
        console.log(error)
    }
}






module.exports = {home,register,login,user}