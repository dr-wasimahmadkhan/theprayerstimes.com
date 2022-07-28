const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;


const validateGetAllMosques = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            page_no: Joi.number().optional(),
            records_per_page: Joi.number().optional(),
            name: Joi.string().optional().allow(''),
            lat: Joi.number().optional().allow(''),
            lng: Joi.number().optional().allow(''),
            // state: Joi.string().optional().allow(''),
            // city: Joi.string().optional().allow(''),
            // address: Joi.string().optional().allow(''),
            is_verified: Joi.boolean().optional(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]})
    }
};

const validateGetMosqueById = async (req, res, next) => {
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

const validateCreateMosque = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            image_id: Joi.string().optional().allow(""),
            user_id: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            address: Joi.string().required(),
            lat: Joi.number().required(),
            lon: Joi.number().required(),
            type: Joi.string().required(),
            created_by: Joi.string().required(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]})
    }
};

const validateUpdateMosque = async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().max(255).required(),
            image_id: Joi.string().optional().allow(""),
            mosque_images: Joi.array().optional(),
            updated_by: Joi.string().optional(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]});

    }
};

const validateDeleteMosqueById = async (req, res, next) => {
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

module.exports = {
    validateGetAllMosques,
    validateGetMosqueById,
    validateCreateMosque,
    validateUpdateMosque,
    validateDeleteMosqueById,
}