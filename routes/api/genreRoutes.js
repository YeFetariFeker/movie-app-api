/* routes/api/genreRoutes.js */
const router = require('express').Router();
const { genreDao: dao } = require('../../daos/dao');

/* GET /api/genre → all genres */
router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});

/* Sorter */
router.get('/sort/:sorter', (req, res)=> {
  const sorter = req.params.sorter
  dao.sort(res, dao.table, sorter)
})

/* GET /api/genre/:id → one genre by ID */
// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid genre ID' });
//   }
//   dao.findById(id, res);
// });

// http://localhost:3000/api/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

/* POST /api/genre → create new genre */
router.post('/create', (req, res) => {
  const { genre } = req.body;
  if (!genre || typeof genre !== 'string') {
    return res.status(400).json({ error: 'genre is required and must be a string' });
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