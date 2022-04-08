import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
   * Controller to create a new note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
 export const addNewNote = async (req, res, next) => {
  try {
    const createdData = await NoteService.addNewNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: createdData,
      message: 'Note Added successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all notes available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getAllNotes = async (req, res, next) => {
    try {
      const allNotes = await NoteService.getAllNotes(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: allNotes,
        message: 'All Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller to get a single note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const getNote = async (req, res, next) => {
    try {
      const noteById = await NoteService.getNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: noteById,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller to update a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const updateNote = async (req, res, next) => {
    try {
      const noteUpdated = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: noteUpdated,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller to delete a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const deleteNote = async (req, res, next) => {
    try {
      await NoteService.deleteNote(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to archive a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
   export const noteArchive = async (req, res, next) => {
    try {
      const noteArchived = await NoteService.noteArchive(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: noteArchived,
        message: 'Note archived successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to trash a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
   export const noteTrash = async (req, res, next) => {
    try {
      const noteTrashed = await NoteService.noteTrash(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: noteTrashed,
        message: 'Note fully deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
