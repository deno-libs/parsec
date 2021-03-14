# parsec 🌌

[![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

Tiny body parser for Deno. Port of the [milliparsec](https://github.com/talentlessguy/milliparsec) library.

## Usage

### Vanilla

```ts
import { serve } from 'https://deno.land/std@0.89.0/http/server.ts'
import { json, ReqWithBody } from 'https://deno.land/x/parsec/mod.ts'

const s = serve({ port: 3000 })

for await (const req of s) {
  await json(req)
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

## Opine

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
