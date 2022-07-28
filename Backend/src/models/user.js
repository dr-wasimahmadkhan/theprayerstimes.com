const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image_id: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.storageFiles,
    },
    full_name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    verification_code: {
        type: String,
        default: null
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'customer_care'],
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.users,
    }
});

userSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.users, userSchema);