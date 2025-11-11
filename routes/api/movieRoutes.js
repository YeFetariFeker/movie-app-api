/* routes/api/movieRoutes.js */
const router = require('express').Router();
const { movieDao: dao } = require('../../daos/dao');

/* GET /api/movie → all movies with actors, directors, genres, platforms */
router.get('/', (req, res) => {
  dao.findMovieInfo(res, dao.table);
});

/* GET /api/movie/:id → single movie (full details) */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  // Reuse findMovieInfo but filter by ID
  dao.findMovieInfo(res, dao.table); // or add findById version later
});

/* GET /api/movie/sort/:sorter → sorted list (title, yr_released, rating, etc.) */
router.get('/sort/:sorter', (req, res) => {
  const sorter = req.params.sorter;
  dao.sort(res, dao.table, sorter); // safe in daoCommon.js
});

/* POST /api/movie → create new movie */
router.post('/', (req, res) => {
  const {
    title,
    rating,
    runtime,
    nationality,
    yr_released,
    budget,
    gross,
    production_id,
    showing,
    poster
  } = req.body;

  if (!title || !yr_released) {
    return res.status(400).json({ error: 'title and yr_released are required' });
  }

  if (typeof dao.createMovie === 'function') {
    dao.createMovie(req, res);
  } else {
    res.status(501).json({ error: 'Create movie not implemented yet' });
  }
});

/* Export router */
module.exports = router;