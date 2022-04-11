import { result } from '@hapi/joi/lib/base';
import User from '../models/user.model';  
import { sendingMailTo } from '../utils/mailer';
 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//create new user
export const userRegistration = async (userBody) => {
  let saltRounds = 10;
  const hashPass = await bcrypt.hash(userBody.password, saltRounds)
  userBody.password = hashPass;
  const data = await User.create(userBody);
  return data;
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

  const storedData = await User.findOne({email: body.emailID})
  if(storedData.emailID != null ){
    const token = jwt.sign({"emailID": storedData.emailID,"id":storedData._id},process.env.SECRET_CODE2 );
    const generateMail = sendingMailTo(storedData.emailID, token);
    return generateMail;
  }
  else{
    throw new Error("email is not registered")
  }
}

