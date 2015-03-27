var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
//index页
exports.index = function(req, res){
    console.log(req.user.admin+'11111111111111111111111');
    if (!req.user.admin) return res.send(401);
    res.render('index');
};
