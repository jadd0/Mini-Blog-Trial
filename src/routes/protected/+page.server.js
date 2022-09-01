import { parseCookie } from "../../cookieParser.js";

import { Login } from "../../classes/login.js";
const login = new Login();

/** @type {import('./$types').Load} */
export function load({ request }) {
  const cookie = request.headers.get("cookie");
  const cookieList = parseCookie(cookie);

  const jwt = JSON.parse(cookieList.jwt) || ''
  
  const user = login.authenticate(jwt.username, jwt.password)

  console.log(user)
  return {
    body: "hello"
  }
}

