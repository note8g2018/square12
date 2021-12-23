const express       = require('express');
const { resetPassword }    = require('../controllers/resetPassword_C');

const router = express.Router();

router.route('/:resetToken').post(resetPassword);

module.exports = router;