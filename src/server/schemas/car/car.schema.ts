import * as mongoose from 'mongoose';

export const CAR_SCHEMA = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    brand: {
        type: String,
        requried: true
    },
    color: {
        type: String,
        requried: true
    },
    carModel: {
        type: String,
        requried: true
    },
    year: {
        type: String,
        requried: true
    },
    isUsed: {
        type: Boolean,
        default: false,
        requried: true
    },
});
