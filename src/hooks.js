export const handle = async ({ event, resolve }) => {
  const url = event.request.url.split('/')
  const response = resolve(event)

  if(url[3].toLowerCase() === 'protected') {
    return new Response('Redirect', {status: 303, headers: { Location: '/' }})
  }

  return response
}