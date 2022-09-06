export async function checkAuth(parseCookie, loginClass, cookie, supabase) {
	const cookieList = parseCookie(cookie);
  
  if (cookieList.jwt == undefined) {
    return false
  }

  const jwt = JSON.parse(cookieList.jwt)
  const user = loginClass.authenticate(supabase, jwt.username, jwt.password)

  if (!user) {
		return false
  }

  return true
}