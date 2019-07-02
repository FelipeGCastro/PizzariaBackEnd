'use strict'
const Order = use('App/Models/Order')

class OrderController {
  async index ({ request, response, view }) {
    const orders = await Order.query()
      .orderBy('created_at', 'desc')
      .fetch()

    return orders
  }

  async myOrders ({ request, response, auth }) {
    const { id } = auth.user
    const orders = await Order.query()
      .where('user_id', id)
      .fetch()

    return orders
  }

  async store ({ request, response, auth }) {
    const { id, username: customer } = auth.user
    const { products, ...data } = request.only([
      'price',
      'products',
      'description',
      'postal_code',
      'street',
      'number',
      'district'
    ])

    const order = await Order.create({
      ...data,
      products,
      user_id: id,
      customer
    })
    return order
  }
  async show ({ params, request, response, view }) {
    const order = await Order.findOrFail(params.id)

    return order
  }

  async update ({ params, request, response }) {}

  async destroy ({ params }) {
    const order = await Order.findOrFail(params.id)

    order.delete()
  }
}

module.exports = OrderController
