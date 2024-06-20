import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req,res) => {
    const { username , email , password } = req.body;

    //Hash the password so we have to use bcrypt
    try{

    
    const hashedPassword = await bcrypt.hash(password,10);

    console.log(hashedPassword);

    //create a new user and save it to the db 
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword,
        },
    });
    console.log(newUser);
    res.status(201).json({message:"User created Successfully"});
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to create User"})
    }   

};
export const login = async (req,res) => {
    const {username , email , password } = req.body;

    try{

    //check if the user exists in the db
    const user  = await prisma.user.findUnique({
        where:{username}
    })

    if(!user) return res.status(401).json({message:"Invalid Credentials!"});

    //check if the passsword is correct
    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid) return res.status(401).json({message:"Invalid Credentials"});

    //generate cookie token and send it to the user
    const age = 1000 * 60 * 60 * 24 * 7;
    
    const token = jwt.sign({
        id:user.id
    },
    process.env.JWT_SECRET_KEY,
        { expiresIn:age }
  );

   

    res.cookie("token", token, {
        httpOnly:true,
        //secure:true,
        maxAge: age,

    }).status(200).json({message:"Login Successfull"});
    
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to login!"})
    }  
}
export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({message:"Logout Succesfull!"});
}