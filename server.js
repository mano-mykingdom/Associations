var express = require('express');
var favicon = require('serve-favicon');
var log4js = require('log4js');
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
        filename: logDirectory + '/ErrorHandling.log',
        maxLogSize: 1000000,
        backups: 10
    }]
});

var _ = require('underscore');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var logger = log4js.getLogger('ErrorHandling');
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
    var model = req.model;
    if (!model) {
        req.errorMessage = 'Requested resource not found.';
        return next(new Error(req.errorMessage));
    }
    res.json({
        success: true,
        data: model.toJSON()
    });
}

function error(err, req, res, next) {
    logger.trace('********Start********');
    logger.debug('path', req.path);
    logger.debug('method', req.method);
    logger.debug('query', req.query);
    logger.debug('body', req.body);
    logger.error(err);
    logger.trace('********End********');
    var response = {};
    if (config.enableErrorDescription) {
        _.extend(response, {
            errorCode: err.code,
            errorMessage: err.message
        });
    }
    res.json(_.extend(response, {
        message: req.errorMessage || 'We are sorry, error occured.',
        success: false
    }));
}

//favicon
app.use(favicon(__dirname + '/app/favicon.ico'));

//route app path
app.use('/', express.static(__dirname + "/app"));

app.get('/data', function (req, res, next) {
    new States().fetch({
        withRelated: ['cities']
    }).then(function (model) {
        req.model = model;
        next();
    }).catch(function (err) {
        req.errorMessage = 'Failed to get data.';
        next(err);
    });
});

app.use(success);
app.use(error);

app.listen(3000);