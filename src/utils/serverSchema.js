const mongoose = require('mongoose');

const schema = mongoose.Schema({
    serverId: { type: Number, required: true },
    staffRole: { type: Number },
    modLogChannel: { type: Number }
});

const model = mongoose.model('Server', schema);

module.exports = model