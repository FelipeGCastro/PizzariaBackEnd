'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')
class Product extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/products/${id}/image`
  }

  types () {
    return this.hasMany('App/Models/Type')
  }
}

module.exports = Product
