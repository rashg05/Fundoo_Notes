"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var noteController = _interopRequireWildcard(require("../controllers/note.controller"));

var _user = require("../validators/user.validator");

var _auth = require("../middlewares/auth.middleware");

var _redis = require("../middlewares/redis.middleware");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to get all notes


router.get('/all', _auth.userAuth, _redis.redis_cached_data, noteController.getAllNotes); //route to create a new note

router.post('/create', _user.noteValidator, _auth.userAuth, noteController.addNewNote); //route to get a single note by their user id

router.get('/:_id', _auth.userAuth, noteController.getNote); //route to update a single note by their user id

router.put('/:_id', _auth.userAuth, noteController.updateNote); //route to delete a single note by their user id

router["delete"]('/:_id', _auth.userAuth, noteController.deleteNote); //route to archive a single note by their user id

router.put('/archive/:_id', _auth.userAuth, noteController.noteArchive); //route to trash a single note by their user id

router.put('/trash/:_id', _auth.userAuth, noteController.noteTrash);
var _default = router;
exports["default"] = _default;