import { superdeno } from 'https://deno.land/x/superdeno@3.0.0/mod.ts'
import { ServerRequest, serve } from 'https://deno.land/std@0.88.0/http/server.ts'
import { bodyParser, json, ReqWithBody } from './mod.ts'
import { describe, it, expect } from 'https://deno.land/x/wizard@0.1.0/mod.ts'

describe('bodyParser(req)', () => {
  it('should decode request body', async () => {
    const request = superdeno(async (req: ServerRequest) => {
      await req.respond({ body: await bodyParser(req) })
    })

    await request.post('/').send('Hello World').expect(200, 'Hello World')
  })
})

describe('json(req)', () => {
  it('should parse JSON body', async () => {
    const request = superdeno(async (req: ServerRequest & ReqWithBody<Record<string, string>>) => {
      await json(req)

      await req.respond({ body: req.requestBody?.hello || 'no body', status: 200 })
    })

    await request.post('/').send('{ "hello": "world" }').expect(200, 'world')
  })
  it('should pass JSON parsing error to next', async () => {
    const request = superdeno(async (req: ServerRequest & ReqWithBody<Record<string, string>>) => {
      await json(req, undefined, async (e) => {
        await req.respond({ status: 500, body: e?.message || '' })
      })
    })

    await request.post('/').send('{ "hello": "wor').expect(500, 'HTTP/1.1 500 Internal Server')
  })
})
