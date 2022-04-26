import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redis_cached_data } from '../middlewares/redis.middleware';

const router = express.Router();

//route to get all notes
router.get('/all', userAuth, redis_cached_data, noteController.getAllNotes);

//route to create a new note
router.post('/create', noteValidator, userAuth, noteController.addNewNote);

//route to get a single note by their user id
router.get('/:_id', userAuth, noteController.getNote);

//route to update a single note by their user id
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a single note by their user id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archive a single note by their user id
router.put('/archive/:_id', userAuth, noteController.noteArchive)

//route to trash a single note by their user id
router.put('/trash/:_id', userAuth, noteController.noteTrash)

export default router;