'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.string('customer').notNullable()
      table.decimal('price').notNullable()
      table.json('products').notNullable()
      table.text('description')
      table.string('postal_code').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('district').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
