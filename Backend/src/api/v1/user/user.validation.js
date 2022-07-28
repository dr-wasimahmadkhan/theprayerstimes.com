const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;


const validateGetAllUsers = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            page_no: Joi.number().optional(),
            records_per_page: Joi.number().optional(),
            full_name: Joi.string().optional().allow(''),
            email: Joi.string().optional().allow(''),
            is_admin: Joi.boolean().optional(),
            is_active: Joi.boolean().optional(),
            role: Joi.string().optional().allow(''),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]})
    }
};

const validateGetUserById = async (req, res, next) => {
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

const validateCreateUser = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            full_name: Joi.string().required(),
            email: Joi.string().required(),
            image_id: Joi.string().optional().allow(""),
            password: Joi.string().required(),
            role: Joi.string().optional(),
            is_verified: Joi.boolean().optional(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]})
    }
};

const validateUpdateUser = async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            full_name: Joi.string().max(255).required(),
            email: Joi.string().optional(),
            image_id: Joi.string().optional().allow(""),
            is_active: Joi.boolean().optional(),
            updated_by: Joi.string().optional(),
        })
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(status.validationError).json({message: error["details"][0]["message"]});

    }
};

const validateDeleteUserById = async (req, res, next) => {
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
    validateGetAllUsers,
    validateGetUserById,
    validateCreateUser,
    validateUpdateUser,
    validateDeleteUserById,
}