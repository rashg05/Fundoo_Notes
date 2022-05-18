"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendingMailTo = exports.Rabbitmq_sendMail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

// async..await is not allowed in global scope, must use a wrapper
var sendingMailTo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emailID, token) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(emailID); //transporter object using the default SMTP transport to transport to mail

            transporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              port: 587,
              secure: true,
              // true for 465, false for other ports
              auth: {
                user: process.env.SENDER,
                // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password

              }
            }); // send mail with defined transport object

            _context.next = 4;
            return transporter.sendMail({
              from: process.env.SENDER,
              // sender address
              to: emailID,
              // list of receivers
              subject: "Hello Message",
              // Subject line
              text: "Hello world?",
              // plain text body
              html: "<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href=\"http://localhost:5000/".concat(token, "\">click here</a></h1>") // html body

            });

          case 4:
            info = _context.sent;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendingMailTo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendingMailTo = sendingMailTo;

var Rabbitmq_sendMail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(emailID) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.SENDER,
                pass: process.env.PASSWORD
              }
            });
            _context2.next = 3;
            return transporter.sendMail({
              form: process.env.SENDER,
              to: emailID,
              subject: "rabbitmq trial",
              html: "<h1>User Registration Successfull</h1>"
            });

          case 3:
            info = _context2.sent;

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function Rabbitmq_sendMail(_x3) {
    return _ref2.apply(this, arguments);
  };
}(); //   // console.log("Message sent: %s", info.messageId);
//   // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   // // Preview only available when sending through an Ethereal account
//   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


exports.Rabbitmq_sendMail = Rabbitmq_sendMail;