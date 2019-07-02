'use strict'

const Type = use('App/Models/Type')
const Helpers = use('Helpers')
class TypeController {
  async index ({ params }) {
    const sizes = await Type.query()
      .where('product_id', params.products_id)
      .fetch()

    return sizes
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'description', 'product_id'])

    try {
      const image = request.file('image', { types: ['image'], size: '2mb' })
      const fileName = `${Date.now()}.${image.subtype}`
      await image.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })
      if (!image.moved()) {
        throw image.error()
      }
      const type = await Type.create({ ...data, image: image.fileName })

      return type
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async show ({ params, request }) {}

  async showImage ({ params, response }) {
    const type = await Type.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${type.image}`))
  }

  async update ({ params, request, response }) {
    const type = await Type.findOrFail(params.id)
    const data = request.only(['name', 'description', 'product_id'])

    try {
      const image = request.file('image', { types: ['image'], size: '2mb' })
      const fileName = `${Date.now()}.${image.subtype}`
      await image.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })
      if (!image.moved()) {
        throw image.error()
      }
      type.merge({ ...data, image: image.fileName })

      await type.save()

      return type
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async destroy ({ params }) {
    const type = await Type.findOrFail(params.id)

    await type.delete()
  }
}

module.exports = TypeController
