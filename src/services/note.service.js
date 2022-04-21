import { result } from '@hapi/joi/lib/base';
import Note from '../models/note.model'; 
import { client } from '../config/redis.js';

//create new note
export const addNewNote = async (body) => {
  const data = await Note.create(body);
  console.log("note added data", data);
  if(data) {
    await client.del('allNotes');
    return data;
  }
  
};

//get all notes
export const getAllNotes = async (body) => {
    const data = await Note.find({UserId: body.UserId});
    if(data){
      await client.set('allNotes', JSON.stringify(data));
      return data;  
    }
    
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
  if(data){
    await client.del('allnotes');
    return data;
  }
  
};
  
//delete single note
export const deleteNote = async (id, body) => {
  await Note.findByIdAndDelete({_id: id, UserId: body.UserId});
};
  
//get single note
export const getNote = async (_id, UserId) => {
  const data = await Note.findById({_id, UserId});
  return data;
};

//archive single note
export const noteArchive = async(_id, body)=>{
  const data = await Note.findByIdAndUpdate({_id: _id, UserId: body.UserId},
    {$set: { IsArchived: true }}
    );
  return data;
};

//Trash Single note
export const noteTrash = async(_id,body)=>{
  const data = await Note.findByIdAndUpdate({_id: _id, UserId: body.UserId},
      {$set: { IsTrash: true }},
  );
  return data; 
};
