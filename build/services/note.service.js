"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.noteTrash = exports.noteArchive = exports.getNote = exports.getAllNotes = exports.deleteNote = exports.addNewNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = require("@hapi/joi/lib/base");

var _note = _interopRequireDefault(require("../models/note.model"));

var _redis = require("../config/redis.js");

//create new note
var addNewNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _note["default"].create(body);

          case 2:
            data = _context.sent;
            console.log("note added data", data);

            if (!data) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _redis.client.del('allNotes');

          case 7:
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addNewNote(_x) {
    return _ref.apply(this, arguments);
  };
}(); //get all notes


exports.addNewNote = addNewNote;

var getAllNotes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _note["default"].find({
              UserId: body.UserId
            });

          case 2:
            data = _context2.sent;

            if (!(data.length == null)) {
              _context2.next = 7;
              break;
            }

            throw new _base.error("There is no note with this user");

          case 7:
            _context2.next = 9;
            return _redis.client.set('allNotes', JSON.stringify(data));

          case 9:
            return _context2.abrupt("return", data);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllNotes(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //get single note


exports.getAllNotes = getAllNotes;

var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, UserId) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _note["default"].findById({
              _id: _id,
              UserId: UserId
            });

          case 2:
            data = _context3.sent;

            if (!(data == null)) {
              _context3.next = 7;
              break;
            }

            throw new _base.error("There is no note with this ID");

          case 7:
            return _context3.abrupt("return", data);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNote(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}(); //update single note


exports.getNote = getNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_id, body) {
    var forCheck, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _note["default"].findById(_id);

          case 2:
            forCheck = _context4.sent;

            if (!(forCheck == null)) {
              _context4.next = 7;
              break;
            }

            throw new _base.error("There is no note with this ID");

          case 7:
            _context4.next = 9;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserId: body.UserId
            }, body, {
              "new": true
            });

          case 9:
            data = _context4.sent;

            if (!data) {
              _context4.next = 14;
              break;
            }

            _context4.next = 13;
            return _redis.client.del('allnotes');

          case 13:
            return _context4.abrupt("return", data);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNote(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}(); //delete single note


exports.updateNote = updateNote;

var deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, body) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _note["default"].findByIdAndDelete({
              _id: id,
              UserId: body.UserId
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteNote(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}(); //archive single note


exports.deleteNote = deleteNote;

var noteArchive = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserId: body.UserId
            }, {
              $set: {
                IsArchived: true
              }
            });

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function noteArchive(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}(); //Trash Single note


exports.noteArchive = noteArchive;

var noteTrash = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserId: body.UserId
            }, {
              $set: {
                IsTrash: true
              }
            });

          case 2:
            data = _context7.sent;
            return _context7.abrupt("return", data);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function noteTrash(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.noteTrash = noteTrash;