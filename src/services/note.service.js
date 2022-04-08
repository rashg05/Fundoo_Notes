import { result } from '@hapi/joi/lib/base';
import Note from '../models/note.model'; 
import jwt from 'jsonwebtoken'; 

//create new user
export const addNewNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all users
export const getAllNotes = async (body) => {
    const data = await Note.find({UserId: body.UserId});
    return data;
  };
  
  //update single user
  export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      { _id: _id, UserId: body.UserId }, 
      body,
      {
        new: true
      }
    );
    return data;
  };
  
  //delete single user
  export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
  };
  
  //get single user
  export const getNote = async (id) => {
    const data = await Note.findById(id);
    return data;
  };