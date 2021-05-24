# parsec 🌌

[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/parsec) [![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

Tiny body parser for Deno. Port of the [milliparsec](https://github.com/talentlessguy/milliparsec) library.

## Features

- supports JSON and urlencoded body parsing
- parses only when `Content-Type` header matches the parser's type
- custom callback function

## Examples

### Vanilla

```ts
import { serve } from 'https://deno.land/std@0.89.0/http/server.ts'
import { json, ReqWithBody } from 'https://deno.land/x/parsec/mod.ts'

const s = serve({ port: 3000 })

for await (const req of s) {
  await json(req, undefined, (err) => {
    if (err) req.respond({ status: 400, body: err.message })
    else req.respond({ status: 204 })
  })
  if (!(req as ReqWithBody).requestBody) {
    req.respond({ status: 404, body: 'No body found' })
  } else {
    const response = JSON.stringify((req as ReqWithBody).requestBody, null, 2)
    req.respond({ body: response })
  }
}
```

### [tinyhttp](https://github.com/talentlessguy/tinyhttp-deno)

```ts
import { App, Request } from 'https://deno.land/x/tinyhttp/mod.ts'
import { json, ReqWithBody } from 'https://deno.land/x/parsec/mod.ts'

const app = new App<unknown, Request & ReqWithBody>()

app
  .use(json)
  .post((req, res) => {
    res.send(req.requestBody || {})
  })
  .listen(3000, () => console.log(`Started on :3000`))
```

## [Opine](https://github.com/asos-craigmorten/opine)

```ts
import { opine } from 'https://deno.land/x/opine/mod.ts'
import { json } from 'https://deno.land/x/parsec/mod.ts'

const app = opine()

app
  .use(json)
  .post('/', (req, res) => {
    res.send(req.parsedBody || {})
  })
  .listen(3000, () => console.log(`Started on :3000`))
```

## [Oak](https://github.com/oakserver/oak)

```ts
import { Application } from 'https://deno.land/x/oak/mod.ts'
import { json, ReqWithBody } from 'https://deno.land/x/parsec/mod.ts'

const app = new Application()

app
  .use((ctx, next) => json(ctx.request.serverRequest, undefined, next))
  .use((ctx) => {
    if (ctx.request.method === 'POST') {
      ctx.response.body = (ctx.request.serverRequest as ReqWithBody).parsedBody
    }
  })

await app.listen({ port: 3000 })
```

Then run:

```sh
curl -X POST localhost:3000 -d '{ "abc": "def" }' -H "Content-Type: application/json"
```

[releases]: https://img.shields.io/github/v/release/deno-libs/parsec?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/parsec?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/parsec/mod.ts
[releases-page]: https://github.com/deno-libs/parsec/releases
[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/parsec/CI?style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/parsec
[github-actions]: https://github.com/deno-libs/parsec/actions
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/parsec?style=flat-square
