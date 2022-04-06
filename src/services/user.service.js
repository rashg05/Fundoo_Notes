import { result } from '@hapi/joi/lib/base';
import User from '../models/user.model';  
 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//create new user
export const userRegistration = async (userBody) => {
  const data = await User.findOne({email: userBody.email});
  if(data){
    throw new Error('User Already Exist with this EmailId');
  }
  else{
  let saltRounds = 10;
  const hashPass = await bcrypt.hash(userBody.password, saltRounds)
  userBody.password = hashPass;
  const responseData = await User.create(userBody);
  return responseData;
  }
};

//get single user
export const userLogIn = async (userBody) => {
  const data = await User.findOne({email: userBody.email});
  
  console.log("my data: ", data);

 if(data != null){
   const validPassword = bcrypt.compare(userBody.password, data.password);
   console.log(userBody.password);
   console.log(data.password);
   if(validPassword){
    var token = jwt.sign({ email: data.email, id: data._id }, process.env.KEY);
    return token;
   }
   else{
     throw new Error('Password does not match');
   }
 }
 else{
  throw new Error('User not Registered');
 }
};
