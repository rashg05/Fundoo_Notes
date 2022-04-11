import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const userLogIn = async (req, res, next) => {
  try {
    const data = await UserService.userLogIn(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      token: data,
      message: 'User logged in successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req,res,next)=>{
  try {
    const data = await UserService.forgetPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data: data,
      message: "password has sent to email"
    })
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req,res) => {
  try {
    
    // console.log(req.body.password);
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data : data,
      message: "password reset successfully"
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
      message :  `${error}`
    })  
  }

}

