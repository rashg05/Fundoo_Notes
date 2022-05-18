"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegistrationValidator = exports.noteValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var userRegistrationValidator = function userRegistrationValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(3).required(),
    lastName: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }),
    password: _joi["default"].string().min(8).max(16).required()
  });

  var _schema$validate = schema.validate(req.userBody),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "Incorrect Details : ".concat(error)
    }); // next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.userRegistrationValidator = userRegistrationValidator;

var noteValidator = function noteValidator(req, res, next) {
  var schema = _joi["default"].object({
    Title: _joi["default"].string().min(3).required(),
    Descreption: _joi["default"].string().min(3).required(),
    color: _joi["default"].string()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error,
      value = _schema$validate2.value;

  if (error) {
    next(error);
  } else {
    next();
  }
};

exports.noteValidator = noteValidator;