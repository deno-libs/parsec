# parsec 🌌

[![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

Tiny body parser for Deno. Port of the [milliparsec](https://github.com/talentlessguy/milliparsec) library.

## Examples

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

## Donate

[![PayPal](https://img.shields.io/badge/PayPal-cyan?style=flat-square&logo=paypal)](https://paypal.me/v1rtl) [![ko-fi](https://img.shields.io/badge/kofi-pink?style=flat-square&logo=ko-fi)](https://ko-fi.com/v1rtl) [![Qiwi](https://img.shields.io/badge/qiwi-white?style=flat-square&logo=qiwi)](https://qiwi.com/n/V1RTL) [![Yandex Money](https://img.shields.io/badge/Yandex_Money-yellow?style=flat-square&logo=yandex)](https://money.yandex.ru/to/410014774355272)

[![Bitcoin](https://badge-crypto.vercel.app/api/badge?coin=btc&address=3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5)](https://badge-crypto.vercel.app/btc/3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5) [![Ethereum](https://badge-crypto.vercel.app/api/badge?coin=eth&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)
](https://badge-crypto.vercel.app/eth/0x9d9236DC024958D7fB73Ad9B178BD5D372D82288) [![ChainLink](https://badge-crypto.vercel.app/api/badge?coin=link&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)](https://badge-crypto.vercel.app/link/0xcd0da1c9b0DA7D2b862bbF813cB50f76F2fB4F5d)

[releases]: https://img.shields.io/github/v/release/deno-libs/parsec?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/parsec?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/parsec/mod.ts
[releases-page]: https://github.com/deno-libs/parsec/releases
[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/parsec/CI?style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/parsec
[github-actions]: https://github.com/deno-libs/parsec/actions
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/parsec?style=flat-square
