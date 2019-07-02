'use strict'
const User = use('App/Models/User')
class SessionController {
  async store ({ request, auth, response }) {
    const { email, password } = request.all()
    const user = await User.findByOrFail('email', email)
    if (user.type === 'user') {
      const token = await auth.attempt(email, password)

      return token
    } else {
      return response.status(401).json('Você não tem permissão de User')
    }
  }
  async storeAdmin ({ request, auth, response }) {
    const { email, password } = request.all()
    const user = await User.findByOrFail('email', email)
    if (user.type === 'admin') {
      const token = await auth.attempt(email, password)

      return token
    } else {
      return response.status(401).json('Você não tem permissão de Admin')
    }
  }
}

module.exports = SessionController
