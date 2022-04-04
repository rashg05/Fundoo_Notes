import { result } from '@hapi/joi/lib/base';
import User from '../models/user.model';  
 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//create new user
export const userRegistration = async (userBody) => {
  let saltRounds = 10;
  const hashPass = await bcrypt.hash(userBody.password, saltRounds)
  userBody.password = hashPass;
  const data = await User.create(body);
  return data;
};

//get single user
export const userLogIn = async (userBody) => {
  const data = await User.find(userBody.email);
  console.log(data);

 if(data != null){
   const validPassword = bcrypt.compareSync(userBody.password, data.password);
   console.log(userBody.password);
   console.log(data.password);
   if(validPassword){
    
   }  
   else{
     throw new Error('password does not match');
   }
 }
 else{
  throw new Error('User not Registered');
 }
};
