const messages = require('./messages/messages.service.js')
const users = require('./users/users.service.js')
const roles = require('./roles/roles.service.js');
module.exports = function (app) {
  app.configure(messages)
  app.configure(users)
  app.configure(roles);
}
