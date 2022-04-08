import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userAuth, noteController.getAllNotes);

//route to create a new note
router.post('', noteValidator, userAuth, noteController.addNewNote);

//route to get a single user by their user id
router.get('/:_id', userAuth, noteController.getNote);

//route to update a single user by their user id
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a single user by their user id
router.delete('/:_id', noteController.deleteNote);

export default router;