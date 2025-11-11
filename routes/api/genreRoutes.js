/* routes/api/genreRoutes.js */
const router = require('express').Router();
const { genreDao: dao } = require('../../daos/dao');

/* GET /api/genre → all genres */
router.get('/', (req, res) => {
  dao.findAll(res);
});

/* GET /api/genre/:id → one genre by ID */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid genre ID' });
  }
  dao.findById(id, res);
});

/* POST /api/genre → create new genre */
router.post('/', (req, res) => {
  const { genre_name } = req.body;
  if (!genre_name || typeof genre_name !== 'string') {
    return res.status(400).json({ error: 'genre_name is required and must be a string' });
  }
  dao.create(req, res);
});

/* DELETE /api/genre/:id → delete genre by ID */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid genre ID' });
  }
  dao.deleteById(id, res);
});

module.exports = router;