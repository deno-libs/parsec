import { makeFetch } from 'https://deno.land/x/superfetch@1.0.4/mod.ts'
import { bodyParser, json, ReqWithBody, urlencoded } from './mod.ts'
import { describe, it, run } from 'https://deno.land/x/tincan@1.0.1/mod.ts'

describe('bodyParser(req)', () => {
  it('should decode request body', async () => {
    const fetch = makeFetch(async (req) => {
      return new Response(await bodyParser((x) => x)(req))
    })
    const res = await fetch('/', { method: 'POST', body: 'Hello World' })

    res.expect('Hello World')
  })
})

describe('json(req)', () => {
  it('should parse JSON body', async () => {
    const fetch = makeFetch(
      async (req: Request & ReqWithBody<Record<string, string>>) => {
        await json(req)

        return new Response(req.parsedBody?.hello || 'no body', {
          status: 200,
        })
      },
    )
    const res = await fetch('/', {
      method: 'POST',
      body: '{ "hello": "world" }',
      headers: { 'Content-Type': 'application/json' },
    })
    res.expect('world')
  })
  it('should pass JSON parsing error to next', async () => {
    const fetch = makeFetch(
      async (req: Request & ReqWithBody<Record<string, string>>) => {
        let status = 200

        await json(req, undefined, () => {
          status = 400
        })
        return new Response(undefined, { status })
      },
    )
    const res = await fetch('/', {
      method: 'POST',
      body: '{ "hello": "wor',
      headers: { 'Content-Type': 'application/json' },
    })
    res.expect(400)
  })
})

describe('urlencoded', () => {
  it('should parse URL encoded form', async () => {
    const fetch = makeFetch(
      async (req: Request & ReqWithBody<Record<string, string>>) => {
        await urlencoded(req)

        return new Response(req.parsedBody?.hello || 'no body', {
          status: 200,
        })
      },
    )
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ hello: 'world' }),
    })
    res.expect('world')
  })
})

run()
