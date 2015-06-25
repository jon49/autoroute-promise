declare var arb: AutoRouteBase.CreateAutoRoute

declare module AutoRouteBase {

    // See http://expressjs.com/guide/routing.html under "Route methods"
    enum Method { get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, "m-search", notify, subscribe, unsubscribe, patch, search, connect }

    interface Options {
        glob: string[]
        _globOptions?: any
        createRoutes?: (postGlobResult: any) => any
    }

    interface CreateAutoRoute {
        createAutoRoute: (options: Options) => void
        method: typeof Method
    }

}

declare module "autoroute-base" {
    export = arb
}
