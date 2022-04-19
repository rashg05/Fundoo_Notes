import { result } from '@hapi/joi/lib/base';
import User from '../models/user.model';  
import { sendingMailTo } from '../utils/mailer.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (userBody) => {
  let saltRounds = 10;
  const hashPass = await bcrypt.hash(userBody.password, saltRounds);
  userBody.password = hashPass;

  // const existCheck = await User.findOne({email: userBody.email})
  // if(existCheck != null){
  //   throw new Error("User Exist");
  // }
  // else {
  const data = await User.create(userBody);
  return data;
  // }
};

//get single user
export const userLogIn = async (userBody) => {
  const data = await User.findOne({email: userBody.email});
  console.log(data);

 if(data != null){
   const validPassword = bcrypt.compareSync(userBody.password, data.password);
   console.log(userBody.password);
   console.log(data.password);
   if(validPassword){
    var token = jwt.sign({ email: data.email, id: data._id }, process.env.KEY);
    return token;
   }  
   else{
     throw new Error('password does not match');
   }
 }
 else{
  throw new Error('User not Registered');
 }
};

export const forgetPassword = async (body) => {

  console.log(body);
  const storedData = await User.findOne({email: body})
  console.log(storedData);
  if(storedData.email != null ){
    
    const token = jwt.sign({"email": storedData.email,"id":storedData._id},process.env.MY_SECRET_KEY );
    const generateMail = sendingMailTo(storedData.email, token);
    console.log("Generated mail ", generateMail);
    return generateMail;
  }
  else{
    throw new Error("email is not registered")
  }
}

export const resetPassword = async (body) => {
  console.log(body);
  const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const resetPass = await User.findByIdAndUpdate({_id: body.UserID} ,
  body,
  {
    new :true
  });
    return resetPass;
  }

