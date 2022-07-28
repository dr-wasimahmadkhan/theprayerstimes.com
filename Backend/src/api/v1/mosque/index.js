const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const mosqueValidations = require('./mosque.validation');
const mosqueController = require('./mosque.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const mosqueMiddleware = require(appRoot + '/src/middle-wares/validation/mosque');

router.get(
    '/all-mosques',
    [jwtValidations, mosqueValidations.validateGetAllMosques],
    mosqueController.getAllMosques
);

router.get(
    '/user/:id',
    [jwtValidations, mosqueValidations.validateGetMosqueById],
    mosqueController.getMosqueByUserId
);

router.get(
    '/:id',
    [jwtValidations, mosqueMiddleware.validateMosque, mosqueValidations.validateGetMosqueById],
    mosqueController.getMosqueById
);

router.post(
    '/',
    [jwtValidations, mosqueValidations.validateCreateMosque],
    mosqueController.createMosque
);

router.patch(
    '/:id',
    [jwtValidations,  mosqueMiddleware.validateMosque, mosqueValidations.validateUpdateMosque],
    mosqueController.updateMosqueByMosqueId
);

router.delete(
    '/:id',
    [jwtValidations, mosqueMiddleware.validateMosque, mosqueValidations.validateDeleteMosqueById],
    mosqueController.deleteMosqueById
);

module.exports = router;
