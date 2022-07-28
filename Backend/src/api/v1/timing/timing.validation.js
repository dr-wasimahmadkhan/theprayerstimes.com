const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;


const validateGetTimingById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        await schema.validateAsync(req.params, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        return res.status(status.validationError).json({message: err["details"][0]["message"]});
    }
};

const validateCreateTiming = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
            mosque_id: Joi.string().required(),
            fajr: Joi.date().required(),
            dhuhr: Joi.string().required(),
            jummah: Joi.string().required(),
            asr: Joi.string().required(),
            maghrib: Joi.string().required(),
            isha: Joi.string().required(),
            created_by: Joi.string().required(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]})
    }
};

const validateUpdateTiming = async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            fajr: Joi.date().required(),
            dhuhr: Joi.string().required(),
            jummah: Joi.string().required(),
            asr: Joi.string().required(),
            maghrib: Joi.string().required(),
            isha: Joi.string().required(),
            is_eid_ul_fitr: Joi.boolean().optional(),
            is_eid_ul_adha: Joi.boolean().optional(),
            is_tarawih: Joi.boolean().optional(),
            is_itikaf: Joi.boolean().optional(),
            eid_ul_fitr_timing: Joi.string().required(),
            eid_ul_adha_timing: Joi.string().required(),
            tarawih_timing: Joi.string().required(),
            updated_by: Joi.string().optional(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]});

    }
};

module.exports = {
    validateGetTimingById,
    validateCreateTiming,
    validateUpdateTiming,
}