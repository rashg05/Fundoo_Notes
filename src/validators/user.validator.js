import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const userRegistrationValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ]}}),
    password: Joi.string().min(8).max(16).required()
  });
  const { error, value } = schema.validate(req.userBody);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Incorrect Details : ${error}`
    });
    // next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(3).required(),
    Descreption: Joi.string().min(3).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
