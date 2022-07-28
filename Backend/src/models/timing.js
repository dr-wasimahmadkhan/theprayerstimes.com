const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const timingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.users,
    },
    mosque_id: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.mosques,
    },
    fajr: {
        type: Date,
        default: null,
    },
    dhuhr: {
        type: Date,
        default: null,
    },
    jummah: {
        type: Date,
        default: null,
    },
    asr: {
        type: Date,
        default: null,
    },
    maghrib: {
        type: Date,
        default: null,
    },
    isha: {
        type: Date,
        default: null,
    },
    is_eid_ul_fitr: {
        type: Boolean,
        default: false,
    },
    eid_ul_fitr_timing: {
        type: Date,
        default: null,
    },
    is_eid_ul_adha: {
        type: Boolean,
        default: false,
    },
    eid_ul_adha_timing: {
        type: Date,
        default: null,
    },
    is_tarawih: {
        type: Boolean,
        default: false,
    },
    tarawih_timing: {
        type: Date,
        default: null,
    },
    is_itikaf: {
        type: Boolean,
        default: false,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.users,
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: schemaReferences.users,
    }
});

timingSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.timings, timingSchema);