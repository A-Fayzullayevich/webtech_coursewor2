const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController')

router.get('/', publicController.getIndex)
router.get('/signup', publicController.getSignUp)
router.get('/signin', publicController.getSignIn)
router.get('/question/:questionId',publicController.getSingleQuestion)

router.post('/signin', publicController.postSignIn)
router.post('/signup', publicController.postSignUp)
router.post('/signout', publicController.postSignOut)


module.exports = router;