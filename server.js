/* Build server */
const express = require('express')
const server = express()
const router = require('./routes/router') /* imported router and connect to router.js */
const PORT = process.env.PORT || 3000

/* Handel security */
const helmet = require('helmet')
const cors = require('cors')

/* Adds the layer security that we need basically for imgs, static javaScripit or CSS files */
/* Configuring helmet */
//server.use(helmet())  // we are configuring helmet and we are  not going to use it 
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))

/* Whenver there is a '/ ' indicates that localhost:3000  then use router*/
server.use('/', router) 


server.listen(PORT, ()=> console.log(`My Movie API is now showing `))