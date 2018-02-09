import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const socket = io('http://localhost:3000', {transports: ['websocket']})

if (!process.browser) {
  CookieStorage.prototype._setCookie = function () {}
}

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: new CookieStorage() }))

export default feathersClient
