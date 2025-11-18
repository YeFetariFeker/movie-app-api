/* routes/router.js – main API router */
const router = require('express').Router();
const PORT = process.env.PORT || 3000;

/* ---------- API INDEX ---------- */
router.get('/api', (req, res) => {
  res.json({
    'All Movies': `http://localhost:${PORT}/api/movie`,
    'All Actors': `http://localhost:${PORT}/api/actor`,
    'All Directors': `http://localhost:${PORT}/api/director`,
    'All Genres': `http://localhost:${PORT}/api/genre`,
    'All Streaming Platforms': `http://localhost:${PORT}/api/streaming_platform`,
    'All Productions': `http://localhost:${PORT}/api/production`
  });
});

/* ---------- DYNAMIC ENDPOINT LOADER ---------- */
// const endpoints = [
//   'movie',
//   'actor',
//   'director',
//   'genre',
//   'streaming_platform', 
//  ' productionDao'
// ];
const endpoints = ['movie','actor','director','genre','production','streaming_platform']
/* DYNAMIC LOADER */
endpoints.forEach(endpoint => {
   
  // const routePath = `/api/${endpoint}`;
  // const routeFile = `./api/${endpoint}Routes.js`;  
  // try {
  //   router.use(routePath, require(routeFile));
  // } catch (err) {
  //   console.error(`Failed to load ${routeFile}:`, err.message);
  // }
  router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes.js`));

  /*commented/ main router loads genreRoutes twice */
  //router.use('/api/genre', require('./api/genreRoutes.js'))  

});


/* ---------- 404 HANDLER (JSON, not HTML) ---------- */
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    message: 'This endpoint does not exist. Check /api for available routes.'
  });
});

module.exports = router;










