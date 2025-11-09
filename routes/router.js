const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000


/* Root Route=> http://localhost:3000/api (router.get/api will take us to the api) */
router.get('/api', (req, res)=> {
    //res.send('movie api') /* only use to test localhost server */
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`       
    })    
})

router.use('/api/movie', require('./api/movieRoutes'))

/* Error handling that is not localhost PORT 3000 */
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error This page does not exist</h1>')
})


module.exports = router
