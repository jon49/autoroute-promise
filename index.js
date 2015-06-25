/// <reference path="typings/typings.d.ts" />
var autoroute_base_1 = require('autoroute-base');
var _ = require('lodash');
var toControllers = _.curry(function (_a, controllerMethod) {
    var message = _a.message, baseRoute = _a.baseRoute, sendWrapper = _a.sendWrapper, routeName = _a.routeName;
    var routeMethodIndex = controllerMethod[0], baseController = controllerMethod[1], methodName = autoroute_base_1.method[routeMethodIndex], messageInfo = { routeName: routeName, methodName: methodName };
    // Wrap base controller in express style callback.
    baseRoute[methodName](function (request, client, error) {
        message.call(messageInfo, messageInfo);
        var send = _.compose(client.send.bind(client), sendWrapper);
        baseController(request).then(send).catch(error).done();
    });
});
var createRoutes = _.curry(function (o, routeDefinitions) {
    _.forEach(routeDefinitions, function (routeDef) {
        var route = routeDef.route, methods = routeDef.methods, startRoute = o.baseRoute(route), options_ = _.assign({}, o, { routeName: route, baseRoute: startRoute });
        _.forEach(methods, toControllers(options_)); // attach routes/methods to router
    });
});
exports.routes = _.curry(function (options, glob) {
    autoroute_base_1.createAutoRoute({ createRoutes: createRoutes(options), glob: glob });
});
exports.method = autoroute_base_1.method;
var test = { routes: exports.routes, method: exports.method };
//# sourceMappingURL=index.js.map