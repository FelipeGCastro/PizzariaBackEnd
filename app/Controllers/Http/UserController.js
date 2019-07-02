'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ auth }) {
    const { username } = auth.user

    return username
  }
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password', 'type'])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
