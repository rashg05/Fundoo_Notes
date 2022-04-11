import express from 'express';
import * as userController from '../controllers/user.controller';
import { userRegistrationValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { passwordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', userRegistrationValidator, userController.userRegistration);

// // for login
router.get('/login', userController.userLogIn);

// for forget password
router.post('/forget', userController.forgetPassword);

//for reset password
router.post('/reset', passwordAuth, userController.resetPassword)

export default router;
