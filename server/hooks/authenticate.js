// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { authenticate } = require('@feathersjs/authentication').hooks
const { NotAuthenticated } = require('@feathersjs/errors')
const verifyIdentity = authenticate('jwt')

function hasToken(hook) {
  return hook.params.headers.authorization || hook.data.accessToken
}

module.exports = async function authenticate(hook) {
  try {
    return await verifyIdentity(hook)
  } catch (error) {
    if (error instanceof NotAuthenticated && !hasToken(hook)) {
      return hook
    }
    
    throw error
  }
}