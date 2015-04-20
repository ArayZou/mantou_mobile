var expressjwt = require('express-jwt'),
    secret = require('./config/secret'),
    path = require('path'),
    site = require('./controllers/site'),
    user = require('./controllers/user'),
    me = require('./controllers/me'),
    msg = require('./controllers/msg'),
    group = require('./controllers/group'),
    post = require('./controllers/post'),
    article = require('./controllers/article'),
    find = require('./controllers/find'),
    myfollows = require('./controllers/myfollows'),
    json = require('./controllers/json');

module.exports = function(app) {

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    app.all('*', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'GET,POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });

    app.post('/api/user/Sign',user.signup);
    app.post('/api/user/Login',user.login);
    app.post('/api/user/GetFollowGroups', expressjwt({secret: secret.secretToken}) , user.getfollowgroups);

    app.post('/api/group/Creat', expressjwt({secret: secret.secretToken}) , group.creatgroup);
    app.post('/api/group/GetGroupIndex', expressjwt({secret: secret.secretToken}) ,group.groupindex);

};
