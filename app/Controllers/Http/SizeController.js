'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sizes
 */
const Size = use('App/Models/Size')
const Helpers = use('Helpers')
class SizeController {
  async index ({ request, response, view, params }) {
    const sizes = await Size.query()
      .where('type_id', params.types_id)
      .fetch()

    return sizes
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'price', 'type_id'])

    try {
      const image = request.file('image', { types: ['image'], size: '2mb' })
      const fileName = `${Date.now()}.${image.subtype}`
      await image.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })
      if (!image.moved()) {
        throw image.error()
      }
      const size = await Size.create({ ...data, image: image.fileName })

      return size
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async show ({ params, request }) {}

  async showImage ({ params, response }) {
    const size = await Size.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${size.image}`))
  }

  async update ({ params, request, response }) {}

  async destroy ({ params }) {
    const size = await Size.findOrFail(params.id)

    await size.delete()
  }
}

module.exports = SizeController
