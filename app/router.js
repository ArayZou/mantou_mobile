var site = require('./controllers/site'),
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
    //pre handler user
    app.use(function(req, res, next) {
        app.locals.user = req.session.user;
        app.locals.group = req.session.group;
        next();
    });

    app.get('/', site.index);
    app.get('*', site.index);
};
