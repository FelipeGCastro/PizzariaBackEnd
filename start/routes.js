'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('adminsessions', 'SessionController.storeAdmin')

Route.get('sizes/:id/image', 'SizeController.showImage')
Route.get('products/:id/image', 'ProductController.showImage')
Route.get('types/:id/image', 'TypeController.showImage')

Route.group(() => {
  Route.get('users', 'UserController.index')
  // Product PART
  Route.resource('products', 'ProductController').apiOnly()

  // Type PART
  Route.resource('products.types', 'TypeController').apiOnly()

  // Size PART
  Route.resource('types.sizes', 'SizeController').apiOnly()

  // Order PART
  Route.resource('orders', 'OrderController').apiOnly()
  Route.get('myorders', 'OrderController.myOrders')
}).middleware(['auth'])
