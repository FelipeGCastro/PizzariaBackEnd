'use strict'

const Env = use('Env')
const Model = use('Model')

class Type extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/types/${id}/image`
  }

  sizes () {
    return this.hasMany('App/Models/Size')
  }

  products () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = Type
