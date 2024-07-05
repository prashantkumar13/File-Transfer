// import express from "express";
import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone} = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      // if (!phone) {
      //   return res.send({ message: "Phone no is Required" });
      // }
      // if (!answer) {
      //   return res.send({ message: "Answer is Required" });
      // }
      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
        name,
        email,
        password: hashedPassword,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  };
  
  // export const loginController =  async ()=>{
  //   try{
  //     const {email,password}=req.body;
  //     if(!email || !password){
  //       return res.send("Something is Incorrect");
  //     }
  //     const  user = await userModel.findOne({email});
  //     if(!user){
  //       return res.send("User does not exist");
  //     }
  //     const match= await comparePassword(password,user.password);
  //     if(!match){
  //       res.status(200).send({
  //         success:"flase",
  //         message:"Wrong Password"
  //       })
  //     }
  //     const token= await JWT.sign({_id:user._id},process.env.SECRET,{
  //       expiresIn:"7d"
  //     });
  //     res.status(200).send({
  //       success:true,
  //       message:"Login Succesfully",
  //       user:{
  //         _id:user._id,
  //         name:user.name,
  //         email:user.email,
  //         phone:user.phone,
  //       },
  //       token,
  //     })
      
  //   }catch(error){
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: "Error in login",
  //       error,
  //     });
  //   }

  // }


  //POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};