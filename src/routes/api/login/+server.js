import { Login } from '../../../classes/login.js';

const login = new Login()

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async({ request }) => {
  const body = await request.json()

  const username = body.username
  const password = body.password

  return {
    body:"hello"
  }
}