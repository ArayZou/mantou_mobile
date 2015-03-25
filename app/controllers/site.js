var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
//index页
exports.index = function(req, res){
    res.sendfile('index.html');
};
