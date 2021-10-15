import { superdeno } from 'https://deno.land/x/superdeno@4.6.0/mod.ts'
import { bodyParser, json, ReqWithBody, urlencoded } from './mod.ts'
import { describe, it, run } from 'https://deno.land/x/tincan@1.0.0/mod.ts'

describe('bodyParser(req)', () => {
  it('should decode request body', async () => {
    const request = superdeno(async (req) => {
      return new Response(await bodyParser((x) => x)(req))
    })

    await request.post('/').send('Hello World').expect(200, 'Hello World')
  })
})

describe('json(req)', () => {
  it('should parse JSON body', async () => {
    const request = superdeno(async (req: Request & ReqWithBody<Record<string, string>>) => {
      await json(req)

      return new Response(req.parsedBody?.hello || 'no body', { status: 200 })
    })

    await request.post('/').set('Content-Type', 'application/json').send('{ "hello": "world" }').expect(200, 'world')
  })
  it('should pass JSON parsing error to next', async () => {
    const request = superdeno(async (req: Request & ReqWithBody<Record<string, string>>) => {
      let status = 200

      await json(req, undefined, async () => {
        status = 400
      })
      return new Response(undefined, { status })
    })

    await request.post('/').set('Content-Type', 'application/json').send('{ "hello": "wor').expect(400)
  })
})

describe('urlencoded', () => {
  it('should parse URL encoded form', async () => {
    const request = superdeno(async (req: Request & ReqWithBody<Record<string, string>>) => {
      await urlencoded(req)

      return new Response(req.parsedBody?.hello || 'no body', { status: 200 })
    })

    await request
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('hello=world')
      .expect(200, 'world')
  })
})

run()
