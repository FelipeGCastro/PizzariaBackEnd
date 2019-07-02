'use strict'

const Model = use('Model')
const Env = use('Env')

class Size extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/sizes/${id}/image`
  }

  types () {
    return this.belongsTo('App/Models/Type')
  }
}

module.exports = Size
