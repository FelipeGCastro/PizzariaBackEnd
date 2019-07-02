'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeSchema extends Schema {
  up () {
    this.create('types', table => {
      table.increments()
      table
        .string('name', 80)
        .notNullable()
        .unique()
      table.string('description', 80).notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
  }
}

module.exports = TypeSchema
