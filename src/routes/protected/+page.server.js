import { parseCookie } from "../../cookieParser.js";

import { Login } from "../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";

const login = new Login();

/** @type {import('./$types').Load} */
export function load({ request }) {
  const cookie = request.headers.get("cookie");
  const cookieList = parseCookie(cookie);

  if (cookieList.jwt == undefined) {
    // throw error(401, 'show yourself, coward');
    throw redirect(307, "/protected/login");
  }

  const jwt = JSON.parse(cookieList.jwt)
  
  console.log(jwt)

  const user = login.authenticate(jwt.username, jwt.password)

  if (!user) {
    throw redirect(307, '/protected/login');
  }

  console.log(user)
  return {
    body: "hello"
  }
}

