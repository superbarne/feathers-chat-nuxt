export default async function (context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  const { accessToken } = auth
  await store.dispatch('auth/authenticate', { strategy: 'jwt', accessToken })

  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('login')
  }
}
