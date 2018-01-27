import Vuex from 'vuex'
import feathersClient from '../api/feathers-client'
import feathersVuex, { initAuth } from 'feathers-vuex'

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

export default function () {
  return new Vuex.Store({
    state: {},
    mutations: {
      increment (state) {
        state.counter++
      }
    },
    actions: {
      nuxtServerInit ({ commit, dispatch }, { req }) {
        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })
      }
    },
    plugins: [
      service('users'),
      service('messages'),
      auth({
        userService: 'users',
        state: {
          publicPages: [
            'login',
            'signup'
          ]
        }
      })
    ]
  })
}
