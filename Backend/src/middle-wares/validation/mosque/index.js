const appRoot = require('app-root-path');
const Mosque = require(appRoot + '/src/models/mosque');
const _get = require('lodash.get');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;

// In this method we will validate booking

exports.validateMosque = async (req, res, next) => {
    try {
        let mosqueId;
        if (_get(req, 'body._id')) {
            mosqueId = _get(req, 'body._id')
        }
        if (_get(req, 'params.id')) {
            mosqueId = _get(req, 'params.id')
        }
        if (_get(req, 'query.id')) {
            mosqueId = _get(req, 'query.id')
        }
        if (mosqueId) {
            const mosqueToFind = await Mosque.findById(mosqueId);
            if (!mosqueToFind) {
                return res.status(status.notFound).json({
                    message: `Sorry, we couldn't find Mosque for the requested ID`
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