const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getCurrentUser', authenticateToken, userController.getCurrentUser);
router.get('/getUserById/:id', userController.getUserById);
router.post('/addUser', userController.addUser);
router.put('/updateUserDetails', authenticateToken, userController.updateUserDetails);
router.post('/loginUser', userController.loginUser);
router.delete('/deleteUser', authenticateToken, userController.deleteUser);
router.post('/google-login', userController.handleGoogleLogin);

module.exports = router;
