export function parseCookie(cookieList) {
	const result = {};
	let jwt = "";
	try {
		cookieList = cookieList.split("; ");

		for (let i in cookieList) {
			const cur = cookieList[i].split("=");
			result[cur[0]] = cur[1];
		}
    // console.log(result)
		// jwt = JSON.parse(result.jwt);
    if (result.jwt == undefined) {
      return false
    }
	} catch {
		return false;
	}

	return result;
}
