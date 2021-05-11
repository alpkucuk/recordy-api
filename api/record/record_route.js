const express = require('express');
const RecordController = require('./record_controller');
const RecordValidator = require('./record_validator');

const router = express.Router();

router
  .route('/')
  .post(RecordValidator.validate(), RecordController.filterRecords);

module.exports = router;
