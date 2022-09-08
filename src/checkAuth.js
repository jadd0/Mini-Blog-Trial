export async function checkAuth(parseCookie, loginClass, cookie, supabase) {
	const cookieList = parseCookie(cookie);
  // console.log(cookieList)
  // console.log(cookieList)
  if (cookieList.jwt == undefined) {
    return false
  }

  const jwt = JSON.parse(cookieList.jwt)
  const user = await loginClass.authenticate(supabase, jwt.username, jwt.password)
  console.log(user)
  if (!user) {
		return false
  }

  return true
}