const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200 // se eliminará en 43200 segundos después de haberse instanciado
    }
});

