import { parseCookie } from "../../cookieParser.js";
import { Login } from "../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../supabaseClient.js";

const loginClass = new Login();

/** @type {import('./$types').Load} */
export function load({ request }) {
  const cookie = request.headers.get("cookie");
  const cookieList = parseCookie(cookie);

  if (cookieList.jwt == undefined) {
    throw redirect(307, "/newpost/login");
  }

  const jwt = JSON.parse(cookieList.jwt)
  const user = loginClass.authenticate(supabase, jwt.username, jwt.password)

  if (!user) {
    throw redirect(307, '/newpost/login');
  }

  return {
    user: user
  }
}