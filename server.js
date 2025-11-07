/* Build server */
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=> console.log(`My Movie API is now showing `))