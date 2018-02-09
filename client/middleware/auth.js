export default async function (context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('/login')
  }
  if (auth.fobiddenPagesOnAuth.includes(route.name) && auth.payload) {
    return redirect('/chat')
  }
}
