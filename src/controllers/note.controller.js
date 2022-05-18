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
    // req.body.UserID = req.body.data.UserID;
    // console.log(req.body.UserID)
    const createdData = await NoteService.addNewNote(req.body);
    console.log(req.body, 'abc')
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
      // req.body.UserId = req.body.data.id;
      console.log("my note id", req.params._id);
      const noteById = await NoteService.getNote(req.params._id, req.body);
    
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
      // req.body.UserId = req.body.data.id;
      const noteUpdated = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: noteUpdated,
        message: 'Note updated successfully with ${req.params._id}'
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
      if (noteArchived == null) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'There is no note with id: ${req.params._id}'
        })
      }
      else {
        res.status(HttpStatus.OK).json({
          code:HttpStatus.OK,
          data: noteArchived,
          message:"Note is Archived Successfully"
        })
      }
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
      if(noteTrashed == null) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'There is no note with id: ${req.params._id}'
        })
      }
      else {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: noteTrashed,
          message: 'Note fully deleted successfully'
        })
      } 
    } catch (error) {
      next(error);
    }
  };
