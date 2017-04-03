const express = require('express');
const SeekController = require('./SeekController');

const SeekRouter = express.Router();

sourceRouter.get('/:username', SeekController.getSeekerResume)

module.exports = SeekRouter;
