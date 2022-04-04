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
export const getUser = async (body) => {
  const data = await User.find(id);
  return data;
};
