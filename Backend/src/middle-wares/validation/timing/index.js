const appRoot = require('app-root-path');
const Timing = require(appRoot + '/src/models/timing');
const _get = require('lodash.get');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;

// In this method we will validate booking

exports.validateTiming = async (req, res, next) => {
    try {
        let timingId;
        if (_get(req, 'body._id')) {
            timingId = _get(req, 'body._id')
        }
        if (_get(req, 'params.id')) {
            timingId = _get(req, 'params.id')
        }
        if (_get(req, 'query.id')) {
            timingId = _get(req, 'query.id')
        }
        if (timingId) {
            const timingToFind = await Timing.findById(timingId);
            if (!timingToFind) {
                return res.status(status.notFound).json({
                    message: `Sorry, we couldn't find Timing for the requested ID`
                });
            }
        }
        next();
    } catch (error) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage,
            error
        });
    }
}