import { result } from '@hapi/joi/lib/base';
import Note from '../models/note.model'; 
import jwt from 'jsonwebtoken'; 

//create new note
export const addNewNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (body) => {
    const data = await Note.find({UserId: body.UserId});
    return data;
  };
  
//update single note
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
  
//delete single note
export const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
};
  
//get single note
export const getNote = async (id) => {
  const data = await Note.findById(id);
  return data;
};

//archive single note
export const noteArchive = async(_id,body)=>{
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    {
      $set: { IsArchived: true }
     
    },
    {
      new: true
    }

  );
  return data;
};

//Trash Single note
export const noteTrash = async(_id,body)=>{
  const data = await Note.findByIdAndUpdate(
      {
          _id
      },
      {   
          $set: { IsTrash: true }
      },
      {
        new: true
      }

  );
  return data; 
};
