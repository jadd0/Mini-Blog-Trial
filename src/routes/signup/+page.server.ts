import { authFlow } from "../../functions/auth";

export const load = async({ request, fetch }) => {
  const auth = await authFlow(request.headers.get("cookie"), fetch)

  let username = ''
  if (!auth) {
    username = ''
  }
  else {
    username = auth.username
  }

	return {
    username: username
  }
};
