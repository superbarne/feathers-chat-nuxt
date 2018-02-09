// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { Forbidden } = require('@feathersjs/errors')
const defaultAbilities = [
  { action: 'users:create', rules: [] },
  { action: 'messages:find', rules: [] },
  { action: 'messages:get', rules: [] }
]
module.exports = function (name = null) {
  return async context => {

    const action = context.method
    const service = name ? context.app.service(name) : context.service
    const serviceName = name || context.path
    const { user } = context.params

    // console.log(action, serviceName, (user ? user.email : 'anonymous'))
    const allAbilities = [].concat(defaultAbilities)
    
    if (user) {
      const roles = await context.app.service('roles').find({
        paginate: false,
        query:{
          _id: {
            $in:user.roles
          }
        }
      })
      for (let role of roles) {
        for (let ability of role.abilities) {
          allAbilities.push(ability)
        }
      }
    }

    let abilities = []
    let visitedActions = []

    for (let ability of allAbilities) {
      let index = visitedActions.indexOf(ability.action)
      if (index === -1) {
        abilities.push(ability)
        visitedActions.push(ability.action)
      } else {
        let sharedRules = Array.from(new Set([...ability.rules, ...abilities[index].rules]))
        let mergedRules = []
        for (let rule of sharedRules) {
          if (ability.rules.includes(rule) && abilities[index].rules.includes(rule)) mergedRules.push(rule)
        }
        abilities[index].rules = mergedRules
      }
    }

    let passingAbilities = [
      `*`,
      `*:*`,
      `*:${action}`,
      `${serviceName}:*`,
      `${serviceName}:${action}`
    ]
    
    if (!abilities.some(ability => passingAbilities.includes(ability.action))) {
      throw new Forbidden()
    }

    

    return context;
  }
}
