import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'

import { userRouter } from './users/user.router'
import { stateRouter } from './state/state.router'
import { statusCatalogRouter } from './statusCatalog/statusCatalog.router'
import { restaurantOwnerRouter } from './restaurant_owner/restaurantOwner.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { ordersRouter } from './orders/orders.router'
import { orderStatusRouter } from './order_status/orderStatus.router'
import { orderMenuItemRouter } from './order_menu_item/orderMenuItem.router'
import { menuItemRouter } from './menu_item/menuItem.router'
import { driverRouter } from './driver/driver.router'
import { commentRouter } from './comment/comment.router'
import { cityRouter } from './city/city.router'
import { categoryRouter } from './category/category.router'
import { addressRouter } from './address/address.router'
import { authRouter } from './auth/auth.router'



const app = new Hono()

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout `,
  })

const { printMetrics, registerMetrics } = prometheus()

// inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))
//3rd party middlewares
app.use('*', registerMetrics)


// default route
app.get('/ok', (c) => {
  return c.text('The server is running!')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)

// custom route
app.route("/", userRouter)   // /users
app.route("/", statusCatalogRouter)   // /statusCatalog
app.route("/", stateRouter)   // /state
app.route("/", restaurantOwnerRouter)   // /restaurantOwner
app.route("/", restaurantRouter)   // /restaurant
app.route("/", ordersRouter)   // /orders
app.route("/", orderStatusRouter)   // /orderstatus
app.route("/", orderMenuItemRouter)   // /orderMenuItem
app.route("/", menuItemRouter)   // /menuItem
app.route("/", driverRouter)   // /driver
app.route("/", commentRouter)   // /comment
app.route("/", cityRouter)   // /city
app.route("/", categoryRouter)   // /category
app.route("/",addressRouter)   // /address
app.route("/",authRouter) 




serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)