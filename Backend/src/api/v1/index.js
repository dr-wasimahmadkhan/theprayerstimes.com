const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const storageFile = require('./storage-file');
const contact = require('./contact');
const mosque = require('./mosque');
const timing = require('./timing');
const dashboardStats = require('./dashboard');

router.use('/auth', auth);
router.use('/user', user);
router.use('/dashboard', dashboardStats);
router.use('/storage-file', storageFile);
router.use('/contact', contact);
router.use('/mosque', mosque);
router.use('/timing', timing);

module.exports = router;
