import { superdeno } from 'https://deno.land/x/superdeno@4.2.1/mod.ts'
import { ServerRequest, serve } from 'https://deno.land/std@0.95.0/http/server.ts'
import { bodyParser, json, ReqWithBody, urlencoded } from './mod.ts'
import { describe, it, run } from 'https://deno.land/x/wizard@0.1.3/mod.ts'

describe('bodyParser(req)', () => {
  it('should decode request body', async () => {
    const request = superdeno(async (req: ServerRequest) => {
      await req.respond({ body: await bodyParser((x) => x)(req) })
    })

    await request.post('/').send('Hello World').expect(200, 'Hello World')
  })
})

describe('json(req)', () => {
  it('should parse JSON body', async () => {
    const request = superdeno(async (req: ServerRequest & ReqWithBody<Record<string, string>>) => {
      await json(req)

      await req.respond({ body: req.parsedBody?.hello || 'no body', status: 200 })
    })

    await request.post('/').set('Content-Type', 'application/json').send('{ "hello": "world" }').expect(200, 'world')
  })
  it('should pass JSON parsing error to next', async () => {
    const request = superdeno(async (req: ServerRequest & ReqWithBody<Record<string, string>>) => {
      await json(req, undefined, async () => {
        await req.respond({ status: 400 })
      })
    })

    await request.post('/').set('Content-Type', 'application/json').send('{ "hello": "wor').expect(400)
  })
})

describe('urlencoded', () => {
  it('should parse URL encoded form', async () => {
    const request = superdeno(async (req: ServerRequest & ReqWithBody<Record<string, string>>) => {
      await urlencoded(req)

      await req.respond({ body: req.parsedBody?.hello || 'no body', status: 200 })
    })

    await request
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('hello=world')
      .expect(200, 'world')
  })
})

run()
