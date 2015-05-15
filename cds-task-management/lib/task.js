/**
 * task.js
 */

var restService = require('cds-rest-services'),
    restUrls = require('cds-rest-services').urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    log = require('cds-logger').logger("cds-task-management");


exports.createTask = function(params, token, callback) {
    log.debug("createTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.createTask, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editTask = function(params, token, callback) {
    log.debug("editTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.task.editTask.path, params.taskId),
        method: restUrls.task.editTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteTask = function(params, token, callback) {
    log.debug("deleteTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.deleteTask.path, params.taskId),
        method: restUrls.task.deleteTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.addAttachmentToTask = function(params, token, callback) {
    log.debug("addAttachmentToTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.addAttachmentToTask.path, params.taskId),
        method: restUrls.task.addAttachmentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteAttachmentFromTask = function(params, token, callback) {
    log.debug("deleteAttachmentFromTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.deleteAttachmentFromTask.path, params.taskId),
        method: restUrls.task.deleteAttachmentFromTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.addCommentToTask = function(params, token, callback) {
    log.debug("addCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.addCommentToTask.path, params.taskId),
        method: restUrls.task.addCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.updateCommentToTask = function(params, token, callback) {
    log.debug("updateCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.updateCommentToTask.path, params.taskId),
        method: restUrls.task.updateCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteCommentToTask = function(params, token, callback) {
    log.debug("deleteCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.deleteCommentToTask.path, params.taskId),
        method: restUrls.task.deleteCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getStatuses = function(params, token, callback) {
    log.debug("getStatuses : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.getStatuses.path, params.statusType),
        method: restUrls.task.getStatuses.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTaskDetails = function(params, token, callback) {
    log.debug("getTaskDetails : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.getTaskDetails.path, params.taskId),
        method: restUrls.task.getTaskDetails.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTasks = function(params, token, callback) {
    log.debug("getTasks : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.getTasks.path, params.loginId),
        method: restUrls.task.getTasks.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getMyTasks = function(params, token, callback) {
    log.debug("getMyTasks : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.getMyTasks.path, params.loginId),
        method: restUrls.task.getMyTasks.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.requestTypes = function(params, token, callback) {
    log.debug("requestTypes : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.requestTypes, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.taskCategories = function(params, token, callback) {
    log.debug("taskCategories : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.taskCategories, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.taskPriority = function(params, token, callback) {
    log.debug("taskPriority : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.taskPriority, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};
