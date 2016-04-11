var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var _ = require('underscore');
var fs = require('fs');
var config = require('./config');
var app = express();

var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: logDirectory + '/access.log',
        maxLogSize: 1000000,
        backups: 10
    }]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var logger = log4js.getLogger();
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

var City = bookshelf.Model.extend({
    tableName: 'cities'
});
var State = bookshelf.Model.extend({
    tableName: 'states',
    cities: function () {
        return this.hasMany(City);
    }
});
var States = bookshelf.Collection.extend({
    model: State
});

function success(req, res, next) {
    var responseData = res.responseData;
    if (!responseData) {
        res.errorMessage = 'Requested resource not found.';
        return next(new Error(res.errorMessage));
    }
    res.json({
        success: true,
        data: responseData
    });
}

function error(err, req, res, next) {
    //adds all missing frames to stack
    Error.captureStackTrace(err);
    logger.trace('********Start********');
    logger.debug('path', req.path);
    logger.debug('method', req.method);
    logger.debug('query', req.query);
    logger.debug('body', req.body);
    logger.error(err);
    logger.trace('********End********');
    var responseData = {};
    if (config.enableErrorDescription) {
        _.extend(responseData, {
            error: _.pick(err, ['code', 'file', 'line', 'message', 'severity', 'stack'])
        });
    }
    res.json(_.extend(responseData, {
        message: res.errorMessage || 'We are sorry, error occured.',
        success: false
    }));
}

//favicon
app.use(favicon(__dirname + '/app/favicon.ico'));

//route app path
app.use('/', express.static(__dirname + "/app"));

app.get('/states', function (req, res, next) {
    new States().fetch({
        withRelated: req.query.withRelated === 'true' ? ['cities'] : null
    }).then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to get data.';
        next(err);
    });
});

app.get('/cities', function (req, res, next) {
    var where = {},
        filters;
    if (req.query.filter) {
        filters = JSON.parse(req.query.filter);
    }
    _.some(filters, function (filter) {
        if (filter.property === 'state_id') {
            where.state_id = filter.value;
        }
    });
    new City().where(where).fetchAll({
        require: true
    }).then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to get data.';
        next(err);
    });
});

app.use(success);
app.use(error);

app.listen(3000);