const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    full_name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    subject: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: null,
    },
    mosque_id: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.mosques,
    },
    type: {
        type: String,
        enum: ['contact', 'complain'],
        default: 'contact',
    }
});

contactSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.contacts, contactSchema);