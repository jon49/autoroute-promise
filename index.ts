/// <reference path="typings/typings.d.ts" />

import {createAutoRoute, method as method_} from 'autoroute-base'
import _ = require('lodash')

const toControllers = _.curry(({message, baseRoute, sendWrapper, routeName}: AutoRouteExpressPromise.ToControllersOptions, controllerMethod: AutoRouteExpressPromise.ControllerMethod) => {

    const [routeMethodIndex, baseController] = controllerMethod,
          methodName = method_[routeMethodIndex], // named route method
          messageInfo = {routeName: routeName, methodName: methodName}

    // Wrap base controller in express style callback.
    baseRoute[methodName]((request: any, client: any, error: any) => {

        message.call(messageInfo, messageInfo)

        var send = <any> _.compose(client.send.bind(client), sendWrapper)

        baseController(request).then(send).catch(error).done()
    })

})

const createRoutes = _.curry((o: AutoRouteExpressPromise.Options, routeDefinitions: AutoRouteExpressPromise.RouteDefinition[]) => {
    _.forEach(routeDefinitions, routeDef => {
        const {route, methods} = routeDef,
              startRoute = o.baseRoute(route), // Get router
              options_: AutoRouteExpressPromise.ToControllersOptions = <any> _.assign({}, o, {routeName: route, baseRoute: startRoute})
        _.forEach(methods, toControllers(options_)) // attach routes/methods to router
    })
})

export const routes = _.curry((options: AutoRouteExpressPromise.Options, glob: string[]) => {
    createAutoRoute({createRoutes: createRoutes(options), glob: glob})
})

export const method = method_

var test = <AutoRouteExpressPromise.AutoRoute> {routes: routes, method: method}