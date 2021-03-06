import { serve } from 'https://deno.land/std@0.89.0/http/server.ts'
import { json, ReqWithBody } from '../mod.ts'

const s = serve({ port: 3000 })

for await (const req of s) {
  await json(req, undefined)
  if (!(req as ReqWithBody).requestBody) {
    req.respond({ status: 404, body: 'No body found' })
  } else {
    const response = JSON.stringify((req as ReqWithBody).requestBody, null, 2)
    req.respond({ body: response })
  }
}
