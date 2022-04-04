const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/create-test', adminController.getTest)
router.get('/admin/profile', adminController.getProfile)

router.post('/admin/create-test', adminController.postTest)
router.post('/admin/delete-question', adminController.deleteTest)
router.get('/admin/question-edit/:questionId', adminController.getEditTest)
router.post('/admin/edit-test', adminController.postEditTest)


module.exports = router;