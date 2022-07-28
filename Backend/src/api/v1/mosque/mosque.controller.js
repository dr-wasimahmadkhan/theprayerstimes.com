const appRoot = require('app-root-path');
const Mosque = require(appRoot + '/src/models/mosque');
const StorageFile = require(appRoot + '/src/models/storage-file');
const _get = require('lodash.get');
const appConstants = require(appRoot + '/src/constants/app-constants');
const MosqueUtil = require('./util');
const { status, messages } = appConstants;


exports.getAllMosques = async (req, res) => {
    try {
        const { records_per_page = 0, page_no = 1, is_populate = false} = req.query;
        const query = await MosqueUtil.buildQuery(req.query)
        const skipPage = parseInt(page_no) - 1;
        const limitPage = parseInt(records_per_page);
        const skipDocuments = skipPage * limitPage;
        let mosques = await Mosque.find(query).populate('user_id').populate("image_id").populate("mosque_images").limit(Number(records_per_page)).skip(skipDocuments).sort({ createdAt: -1 });
        if (mosques && mosques.length > 0 && is_populate) {
            mosques = await MosqueUtil.populateData(mosques);
        }
        const totalNumberOfMosques = await Mosque.countDocuments(query)
        return res.status(status.success).json({
            message: 'Mosques found Successfully.',
            data: mosques,
            page_no: page_no,
            records_per_page: records_per_page,
            total_number_of_mosques: totalNumberOfMosques,
        });
    } catch (err) {
        console.log(err);
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}


exports.getMosqueByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const mosque = await Mosque.findOne({user_id: id}).populate('image_id').populate('user_id').populate("mosque_images");
        return res.status(status.success).json({
            message: 'Mosque found Successfully.',
            data: mosque,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}
exports.getMosqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const mosque = await Mosque.findById(id).populate('image_id').populate('user_id').populate("mosque_images");
        return res.status(status.success).json({
            message: 'Mosque found Successfully.',
            data: mosque,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}

exports.createMosque = async (req, res) => {
    try {
        const mosqueExist = await Mosque.findOne({ user_id: req.body.user_id });
        if (mosqueExist) {
            return res.status(status.duplicateRecord).json({
                message: 'Already Mosque Exist with this User',
            });
        }
        const mosque = await Mosque.create(req.body);
        return res.status(status.success).json({
            message: 'Mosque Created Successfully.',
            data: mosque,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}

exports.updateMosqueByMosqueId = async (req, res) => {
    try {
        const Mosque_id = _get(req, 'params.id')
        const mosque = await Mosque.findByIdAndUpdate({ _id: Mosque_id }, req.body, {new: true});
        return res.status(status.success).json({
            message: 'Mosque Updated Successfully.',
            data: mosque,
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}


exports.deleteMosqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const mosque = await Mosque.findById(id);
        if (Mosque?.image_id) {
            await StorageFile.findByIdAndUpdate({ _id: mosque.image_id }, { schedule_to_delete: true, is_deleted: true }, { new: true });
        }
        await Mosque.deleteOne({ _id: id });
        return res.status(status.success).json({
            message: 'Mosque deleted Successfully.',
        });
    } catch (err) {
        return res.status(status.serverError).json({
            message: messages.serverErrorMessage
        });
    }
}