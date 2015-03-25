var mongoose = require('mongoose'),
    groupSchema;

groupSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    groupId: Number,
    hoster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    intro: String,
    img: String,
    link: String,
    weixin: String,
    weibo: String
});

module.exports = groupSchema;
