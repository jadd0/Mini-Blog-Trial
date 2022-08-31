import { Login } from '../../../classes/login.js';

const login = new Login()

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async({ request }) => {
  const body = await request.json()

  const username = body.username
  const password = body.password

  const res = login.authenticate(username, password)
  // if successful returns cookie

  if (!res) {
    return new Response("false")
  }

  const cookie = login.generateCookie()
  
  const serverResponse = new Response
  serverResponse.headers.append('set-cookie', cookie)
  // Response.headers.set('set-cookie', response)

  return serverResponse
}