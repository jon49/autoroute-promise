# Auto-route Express Promise

## Summary

`Auto-route Express Promise` routing made simple with a single place to update.

## Installation

Install with `npm`:

```
npm install --save autoroute-express-promise
```

## [Project Status](http://www.walkercoderanger.com/blog/2015/06/advice-for-open-source-projects/)

- Beta
- Active (June 26, 2015)

## Example

### Route Set Up

```js
import {routes} from 'autoroute-express-promise'
import isUserAuthenticated = require('../controllers/auth/auth')
import express = require('express')
import withMessageAs = require('../utilities/response-structure')

var router = express.Router()

var authenticatedRoute = route => router.route(route).all(isUserAuthenticated)

routes({
        baseRoute: authenticatedRoute,
        response: (response, result) => response.send(withMessageAs(result)),
        message: (o) => {console.log(o.routeName, o.methodName)}
    }, ['./controllers/**/index.js'])

module.exports = router
```

### Route/Controller Set Up

**File Structure**:

Note, that this is how I do my file structure. Any file structure is OK.

```
├── controllers/
    ├── api1/
    │   └── index.js
    ├── api2/
    │   └── index.js
    └── api3/
        └── index.js
```

**Code Structure**:

Note that you can do an array of routes also.

```js
import {method} from 'autoroute-express-promise'
import {getPet, petDied} = require('../../pets')

const PETS = '/pets',
      ID = 'petId',
      PET = PETS + '/:' + ID

var routes: AutoRouteExpressPromise.RouteDefinition = {
    route: PET,
    methods: [
        [
            method.get,
            (req: Request) => getPet(req.params[ID])
        ],
        [
            method.delete,
            (req: Request) => petDied(req.params[ID])
        ]
    ]
}

export = routes
```

Example with two routes:

```js
import {method} from 'autoroute-express-promise'
import {getPet, newPet, petDied} = require('../../pets')

const PETS = '/pets',
      ID = 'petId',
      PET = PETS + '/:' + ID

var routes: AutoRouteExpressPromise.RouteDefinition[] = [
    {
        route: PETS,
        methods: [
            [
                method.post,
                (req: Request) => getPet(req.body)
            ]
        ]
    },
    {
        route: PET,
        methods: [
            [
                method.get,
                (req: Request) => getPet(req.params[ID])
            ],
            [
                method.delete,
                (req: Request) => petDied(req.params[ID])
            ]
        ]
    }
]

export = routes
```

## API

```js
import {routes, method} from 'autoroute-express-promise'
```

### `routes(options, glob[])`:

where `options`:

```js
{
    baseRoute: (routeName: string) => any
    message?: (options: {routeName: string; methodName: string}) => void
    response: (client: Express.Response, result: any) => any
}
```

**baseRoute**: (Required) Uses route name (e.g., `/api/myroute/:id`) and return
an express.js `Router`. E.g.,

```js
var router = express.Router
var authenticatedRoute = route => router.route(route).all(isUserAuthenticated)
```

**message**: (Optional) A function which passes the route name and method name (post, get,
etc). Used for writing logs when route is called by server, e.g.,

```js
o => {console.log(o.routeName, o.methodName)}
```

where: `o` is `{routeName: '/api/myroute/:id', methodName: 'get'}`.

**response**: (Required) Used to wrap the result in some wrapper and send
method, e.g.,

```js
(client, result) => client.send({result: result})
```

where `glob`:

List of globs as specified in
[`require-glob`](https://www.npmjs.com/package/require-glob). E.g.,
`['./controllers/**/index.js']`.

### `method`:

This is an enumeration of all the `express.js` methods:

`get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, "m-search", notify, subscribe, unsubscribe, patch, search, connect`

E.g.,

```js
method.get // => 0
method[0] // => "get"
```