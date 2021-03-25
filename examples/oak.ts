import { Application } from 'https://deno.land/x/oak/mod.ts'
import { json, ReqWithBody } from '../mod.ts'

const app = new Application()

app
  .use((ctx, next) => json(ctx.request.serverRequest, undefined, next))
  .use((ctx) => {
    if (ctx.request.method === 'POST') {
      ctx.response.body = (ctx.request.serverRequest as ReqWithBody).parsedBody
    }
  })

await app.listen({ port: 3000 })
