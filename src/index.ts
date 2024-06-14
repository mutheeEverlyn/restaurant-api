import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { timeout } from 'hono/timeout';
import { HTTPException } from 'hono/http-exception';
import { prometheus } from '@hono/prometheus';
import {rateLimiter} from 'hono-rate-limiter';
import { userRouter } from './users/user.router';
import { stateRouter } from './state/state.router';
import { statusCatalogRouter } from './statusCatalog/statusCatalog.router';
import { restaurantOwnerRouter } from './restaurant_owner/restaurantOwner.router';
import { restaurantRouter } from './restaurant/restaurant.router';
import { ordersRouter } from './orders/orders.router';
import { orderStatusRouter } from './order_status/orderStatus.router';
import { orderMenuItemRouter } from './order_menu_item/orderMenuItem.router';
import { menuItemRouter } from './menu_item/menuItem.router';
import { driverRouter } from './driver/driver.router';
import { commentRouter } from './comment/comment.router';
import { cityRouter } from './city/city.router';
import { categoryRouter } from './category/category.router';
import { addressRouter } from './address/address.router';
import { authRouter } from './auth/auth.router';



const app = new Hono()
const limiter = rateLimiter({
windowMs:1 * 60 *1000,
limit:3,
standardHeaders: "draft-6",
keyGenerator :(c) =>"<unique_key>"
});

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
app.get('/',(c) =>{
  return c.html(`
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant Management System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        header {
            background-color: #007BFF;
            color: white;
            padding: 20px 0;
            text-align: center;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1{
        color:#fff;
        }
         h2 {
            color: #007BFF;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        footer {
            text-align: center;
            padding: 20px 0;
            background-color: #007BFF;
            color: white;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to my Restaurant API</h1>
    </header>
    <div class="container">
        <h2>About</h2>
        <p>My API helps you access data about a Restaurant information from the database.</p>
        
        <h2>Features of m API</h2>
        <ul>
            <li>Easy to integrate</li>
            <li>Fast and reliable</li>
            <li>Secure and scalable</li>
        </ul>
        <h2>please regiter here</h2>
        <a href="http://eveapi.azurewebsites.net/register" class="btn">register </a>
        <h2>click to login</h2>
        <a href="http://eveapi.azurewebsites.net/login" class="btn">login </a>
        <h2>Adding address data</h2>
        <a href="http://eveapi.azurewebsites.net/address" class="btn">add </a>
        <h2>add an order-menu-item</h2>
        <a href="http://eveapi.azurewebsites.net/orderMenuItem" class="btn">add </a>
        <h2>add a comment</h2>
        <a href="http://eveapi.azurewebsites.net/comment" class="btn">add </a>
        <h2>get comments</h2>
        <a href="http://eveapi.azurewebsites.net/comment" class="btn">view data </a>
        <h2>add users</h2>
        <a href="http://eveapi.azurewebsites.net/users" class="btn">add </a>
        <h2>deleting a user </h2>
        <a href="http://eveapi.azurewebsites.net/users/1" class="btn">delete </a>
        <h2>update a user </h2>
        <a href="http://eveapi.azurewebsites.net/user/1" class="btn">update </a>
        <h2>viewing all users data</h2>
        <a href="http://eveapi.azurewebsites.net/users" class="btn">view data</a>
        <h2>viewing data of a specific user</h2>
        <a href="http://eveapi.azurewebsites.net/users/1" class="btn">view data</a>
        <h2>viewing all data of the menuItem</h2>
        <a href="http://eveapi.azurewebsites.net/menuItem" class="btn">view data </a>
        <h2>viewing all comments</h2>
        <a href="http://eveapi.azurewebsites.net/comment" class="btn">view data  </a>
        <h2>viewing data from restaurantOwner</h2>
        <a href="http://eveapi.azurewebsites.net/restaurantOwnerData" class="btn">view data </a>
        <h2>viewing data in a restaurant</h2>
        <a href="http://eveapi.azurewebsites.net/restaurantData" class="btn">view data  </a>
        <h2>viewing order prices greater than</h2>
        <a href="http://eveapi.azurewebsites.net/orderPrice?price=500" class="btn">view data  </a>
        <h2>viewing data of cities starting with a certain letter</h2>
        <a href="http://eveapi.azurewebsites.net/cityNames?cityName=n" class="btn">view data  </a>
        <h2>viewing data of limitted addresses</h2>
        <a href="http://eveapi.azurewebsites.net/limitAddress?limit=1" class="btn">view data  </a>
        <h2>viewing data of ordered car year from latest</h2>
        <a href="http://eveapi.azurewebsites.net/orderCarYear" class="btn">view data  </a>
        <h2>viewing data of emails verified</h2>
        <a href="http://eveapi.azurewebsites.net/emailVerifiedTrue" class="btn">view data  </a>
        <h2>viewing data in orders</h2>
        <a href="http://eveapi.azurewebsites.net/orderData" class="btn">view data  </a>
        <h2>viewing data in category</h2>
        <a href="http://eveapi.azurewebsites.net/categoryData" class="btn">view data  </a>
        <h2>viewing data in city</h2>
        <a href="http://eveapi.azurewebsites.net/cityData" class="btn">view data  </a>
        <h2>viewing data in comments</h2>
        <a href="http://eveapi.azurewebsites.net/commentData" class="btn">view data  </a>
        <h2>viewing data in orderStatus</h2>
        <a href="http://eveapi.azurewebsites.net/orderStatusData" class="btn">view data  </a>
        <h2>viewing data in orderMenuItem</h2>
        <a href="http://eveapi.azurewebsites.net/orderMenuItemData" class="btn">view data  </a>
        <h2>viewing data in menuItem</h2>
        <a href="http://eveapi.azurewebsites.net/menuItemData" class="btn">view data  </a>
        <h2>viewing data in driversData</h2>
        <a href="http://eveapi.azurewebsites.net/driversData" class="btn">view data  </a>
        <h2>viewing data in the status catalog</h2>
        <a href="http://eveapi.azurewebsites.net/statusCatalogData" class="btn">View data in status catalog</a>
        <h2>viewing data in users</h2>
        <a href="http://eveapi.azurewebsites.net/usersData" class="btn">view data </a>
        <h2>viewing data in state</h2>
        <a href="http://eveapi.azurewebsites.net/stateData" class="btn">view data </a>
        <h2>viewing data in address</h2>
        <a href="http://eveapi.azurewebsites.net/addressData" class="btn">view data </a>
        <h2>viewing data in drivers</h2>
        <a href="http://eveapi.azurewebsites.net/driversData" class="btn">view data </a>
        <h2>viewing data in users</h2>
        <a href="http://eveapi.azurewebsites.net/usersData" class="btn">view data </a>
    </div>
    <footer>
        <p>&copy; Everlyn Muthoni API. All rights reserved.</p>
    </footer>
</body>
</html>

    `)
})
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


app.use(limiter);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)
