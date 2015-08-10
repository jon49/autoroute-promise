declare module RouteMethods {

    interface RouteDefinition<T, S> {

        /**
        * Route name, e.g., route: "/api/myroute/:id"
        */
        route: string

        /**
        * E.g., methods: [
        *   [method.get, req => myFunctionThatReturnsAPromiseGet(req.params["theIdName"])],
        *   [method.delete, req => myFunctionThatReturnsAPromiseDelete(req.params["theIdName"])]
        * ]
        */
        methods: [[T, S]]

    }

    interface SubRoutes {
        <T, S>(routes: [string, any]): RouteDefinition<T, S>[]
    }

    interface FlattenAltRoute {
        <T, S>(routes: any): RouteDefinition<T, S>[]
    }

    interface FlattenRoute {
        <T, S>(routeDefinition: any): RouteDefinition<T, S>[]
    }

}

declare var routeMethods: {
    flattenAltRoute: RouteMethods.FlattenAltRoute
    flattenRoute: RouteMethods.FlattenRoute
    subRoutes: RouteMethods.SubRoutes
}

declare module "route-methods" {
    export = routeMethods
}
