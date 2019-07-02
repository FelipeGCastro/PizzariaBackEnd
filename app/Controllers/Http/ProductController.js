'use strict'

const Product = use('App/Models/Product')
const Helpers = use('Helpers')
class ProductController {
  async index ({ request, response, view }) {
    const products = await Product.query().fetch()

    return products
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'description', 'waiting_time'])

    try {
      const image = request.file('image', { types: ['image'], size: '2mb' })
      const fileName = `${Date.now()}.${image.subtype}`
      await image.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })
      if (!image.moved()) {
        throw image.error()
      }
      const product = await Product.create({ ...data, image: image.fileName })

      return product
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async show ({ params, response }) {
    const product = await Product.findOrFail(params.id)

    return product
  }
  async showImage ({ params, response }) {
    const product = await Product.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${product.image}`))
  }

  async update ({ params, request, response }) {}

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = ProductController
