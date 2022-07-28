const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const userValidations = require('./user.validation');
const userController = require('./user.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const UserMiddleware = require(appRoot + '/src/middle-wares/validation/user');

router.get(
    '/all-users',
    userController.getAllUsers
);

router.get(
    '/:id',
    [jwtValidations, UserMiddleware.validateUser, userValidations.validateGetUserById],
    userController.getUserById
);

router.post(
    '/',
    userController.createUser
);

router.patch(
    '/:id',
    [jwtValidations,  UserMiddleware.validateUser, UserMiddleware.validateUserWithEmail, userValidations.validateUpdateUser],
    userController.updateUserByUserId
);

router.delete(
    '/:id',
    [jwtValidations, UserMiddleware.validateUser, userValidations.validateDeleteUserById],
    userController.deleteUserById
);

module.exports = router;
