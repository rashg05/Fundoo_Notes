"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var noteSchema = new _mongoose.Schema({
  Title: {
    type: String,
    required: true,
    trim: true
  },
  Descreption: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String
  },
  IsArchived: {
    type: Boolean,
    "default": false
  },
  IsTrash: {
    type: Boolean,
    "default": false
  },
  UserId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', noteSchema);

exports["default"] = _default;