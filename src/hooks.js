export const handle = async ({ event, resolve }) => {
  const url = event.request.url.split('/')
  const response = resolve(event)

  if(url[3] === 'protected' && url[4] !== 'login') {
    return new Response('Redirect', {status: 303, headers: { Location: '/protected/login' }})
  }

  return response
}