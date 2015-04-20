var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    _ = require('underscore'),
    secret = require('../config/secret'),
    User,
    Group;
require('../models/user');
require('../models/group');
User = mongoose.model('User');
Group = mongoose.model('Group');
//注册
exports.signup = function(req, res) {
    var req_body = req.body;

    User.find({name: req_body.name}, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user.length > 0) {
            return res.send({
                status:400,
                error:"用户已存在"
            });
        } else {
            user = new User({
                name: req_body.name,
                password: req_body.password,
                img:'/img/groupimg.png'
            });

            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                return res.send({
                    status:200,
                    error:""
                });
            });
        }
    });
};

//登录
exports.login = function(req, res) {
    var req_body = req.body,
        name = req_body.username,
        pwd = req_body.password;
    User.findOne({name: name}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.send({
                status:400,
                error:"用户不存在"
            });
        }

        user.pwdMatch(pwd, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (!isMatch) {
                return res.send({
                    status:401,
                    error:"用户名密码不匹配"
                });
            }

            var token = jwt.sign({id:user._id}, secret.secretToken, { expiresInMinutes: 60 });
            user.Auth=token;
            user = _.extend(user, {
                Token: token
            });
            user.save(function(err, _user) {
                if (err) {
                    console.log(err);
                }
                var userdata = {
                    name:_user.name,
                    img:_user.img,
                    Token:_user.Token
                }
                return res.send({
                    status:200,
                    error:"",
                    user:userdata
                });
            });
        });
    });
};

//修改密码
exports.repwd = function(req, res) {
    var id = req.session.user._id;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                user.pwdMatch(req.body.oldPwd, function(err, isMatch) {
                    if (err) {
                        console.log(err);
                    }
                    if (isMatch) {
                        user = _.extend(user, {password: req.body.newPwd});
                        user.save(function(err, _user) {
                            if (err) {
                                console.log(err);
                            }
                            req.session.user = _user;
                            res.send({
                                success: true
                            });
                        });
                    } else {
                        res.send({
                            success: false,
                            err: '密码不正确'
                        });
                    }
                });
            }
        });
    }
};

//基本信息
exports.info = function(req, res) {
    var id = req.session.user._id,
        reqBody = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                user = _.extend(user, {
                    realname: reqBody.realName,
                    weibo: reqBody.weibo,
                    qq: reqBody.qq,
                    sign: reqBody.sign
                });
                user.save(function(err, _user) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.user = _user;
                    res.send({
                        success: true
                    });
                });
            }
        });
    }
};
//用户关注群组列表
exports.getfollowgroups = function(req, res) {
    var userId = req.user.id;
    if (userId) {
        User.findOne({_id:userId}).populate({path:'followgroup'}).exec(function(err, user) {
            if (err) {
                console.log(err);
            }
            return res.send({
                status:200,
                error:"",
                group:user.followgroup
            });
        });
    }
};
//关注群组
exports.followgroup = function(req, res) {
    var userId = req.user.id,
        reqBody = req.body;
    var ifFollow = true;
    if (userId) {
        User.findById(userId, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                Group.find({name:reqBody.groupName},function(err,group){
                    if (err) {
                        console.log(err);
                    }
                    if(user.followgroup.length >0){
                        for(var i = 0;i<user.followgroup.length;i++){
                            if(String(user.followgroup[i])==String(group[0]._id)){
                                Array.remove(user.followgroup,i);
                                User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                                    if (err) {
                                        console.log(err);
                                    }
                                    req.session.user = user;
                                    // 关注群组缓存
                                    req.session.group = [];

                                    var followgroupId = [];
                                    for(var i = 0;i<req.session.user.followgroup.length;i++){
                                        followgroupId.push(req.session.user.followgroup[i]);
                                    }
                                    Group.find({_id:{$in:followgroupId}},function(err,group){
                                        if(err){
                                            console.log(err)
                                        }
                                        req.session.group = group;
                                        res.send({
                                            success:2
                                        });
                                    })
                                });
                                ifFollow = false;
                                break;
                            }
                        }
                    }
                    if(ifFollow){
                        user.followgroup.push(group[0]._id);
                        User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                            if (err) {
                                console.log(err);
                            }
                            req.session.user = user;
                            // 关注群组缓存
                            req.session.group = [];

                            var followgroupId = [];
                            for(var i = 0;i<req.session.user.followgroup.length;i++){
                                followgroupId.push(req.session.user.followgroup[i]);
                            }
                            Group.find({_id:{$in:followgroupId}},function(err,group){
                                if(err){
                                    console.log(err)
                                }
                                req.session.group = group;
                                res.send({
                                    success:1
                                });
                            })
                        });
                    }
                });
            }
        });
    }else{
        res.send({
            error:1
        });
    }
};

// 保存用户头像接口
var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({ imageMagick : true });
exports.saveuserimg = function(req, res){
    var id = req.session.user._id,
        req_body = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                //判断目录是否存在，不存在新建
                if(!fs.existsSync('web/public/uploads/user')){
                    fs.mkdirSync('web/public/uploads/user');
                }
                var imgSrc = req_body.imgSrc;
                imageMagick(imgSrc)
                    .crop(req_body.imgWidth, req_body.imgHeight, req_body.imgX, req_body.imgY)
                    .resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸100*100！
                    .write('web/public/uploads/user/'+user._id+'.jpg', function(err){
                        if (err) {
                            console.log(err);
                            res.end();
                        }
                        user.img = '/uploads/user/'+user._id+'.jpg';
                        user.save(function(err, user) {
                            if (err) {
                                console.log(err);
                            }
                            req.session.user = user;
                            res.send({
                                success:1
                            });
                        });
                    });
            }
        });
    }
}


Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};
