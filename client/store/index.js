import Vuex from 'vuex'
import feathersClient from '../api/feathers-client'
import feathersVuex, { initAuth } from 'feathers-vuex'

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

export default function () {
  return new Vuex.Store({
    state: {},
    actions: {
      async nuxtServerInit ({ commit, dispatch, state }, { req }) {
        await initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })

        if (state.auth.accessToken) {
          let { accessToken } = state.auth
          await dispatch('auth/authenticate', { strategy: 'jwt', accessToken })
        }
      },
      async nuxtClientInit ({ commit, dispatch, state }) {
        if (state.auth.accessToken) {
          let { accessToken } = state.auth
          await dispatch('auth/authenticate', { strategy: 'jwt', accessToken })
        }
      }
    },
    plugins: [
      service('messages'),
      service('users'),
      auth({
        userService: 'users',
        state: {
          publicPages: [
            'login',
            'signup',
            'index'
          ]
        }
      })
    ]
  })
}
