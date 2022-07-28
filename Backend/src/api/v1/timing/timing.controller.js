const appRoot = require('app-root-path');
const Timing = require(appRoot + '/src/models/timing');
const _get = require('lodash.get');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;


exports.getTimingByMosqueId = async (req, res) => {
    try {
        const { id } = req.params;
        const timing = await Timing.findOne({ mosque_id: id });
        return res.status(status.success).json({
            message: 'Timing found Successfully.',
            data: timing,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}
exports.getTimingById = async (req, res) => {
    try {
        const { id } = req.params;
        const timing = await Timing.findById(id);
        return res.status(status.success).json({
            message: 'Timing found Successfully.',
            data: timing,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}

exports.createTiming = async (req, res) => {
    try {
        const timing = await Timing.create(req.body);
        return res.status(status.success).json({
            message: 'Timing Created Successfully.',
            data: timing,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}

exports.updateTimingByTimingId = async (req, res) => {
    try {
        const timing_id = _get(req, 'params.id')
        const timing = await Timing.findByIdAndUpdate({ _id: timing_id }, req.body, {new: true});
        return res.status(status.success).json({
            message: 'Timing Updated Successfully.',
            data: timing,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}