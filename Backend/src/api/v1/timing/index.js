const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const TimingValidations = require('./timing.validation');
const TimingController = require('./timing.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const TimingMiddleware = require(appRoot + '/src/middle-wares/validation/timing');

router.get(
    '/mosque-id/:id',
    [jwtValidations, TimingValidations.validateGetTimingById],
    TimingController.getTimingByMosqueId
);

router.get(
    '/:id',
    [jwtValidations, TimingMiddleware.validateTiming, TimingValidations.validateGetTimingById],
    TimingController.getTimingById
);

router.post(
    '/',
    [jwtValidations, TimingValidations.validateCreateTiming],
    TimingController.createTiming
);

router.patch(
    '/:id',
    [jwtValidations,  TimingMiddleware.validateTiming, TimingValidations.validateUpdateTiming],
    TimingController.updateTimingByTimingId
);

module.exports = router;
