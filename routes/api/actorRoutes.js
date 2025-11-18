/* routes/api/actorRoutes.js */
const router = require('express').Router();
const { actorDao: dao } = require('../../daos/dao');

/* GET /api/actor → all actors */
router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});

/* GET /api/actor/:id → single actor */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid actor ID' });
  dao.findById(res, dao.table, id);
});

/* GET /api/actor/:id/movies → movies by actor */
router.get('/:id/movies', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid actor ID' });
  dao.findMoviesByActor(res, dao.table, id);
});

/* GET /api/actor/sort/:sort */
router.get('/sort/:sorter', (req, res)=> {
  const sorter = req.params.sorter;
  const allowedSorts = ['id', 'first_name', 'last_name'];
  if (!allowedSorts.includes(sorter)) {
    return res.status(400).json({ error: 'Invalid sort field'});
  }
  dao.sort(res, dao.table, sorter)
})

/* POST /api/actor → create new actor */
router.get('/', (req, res) => {
  const { first_name, last_name, img_url } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'first_name and last_name are required' });
  }

  dao.create(req, res);
});

module.exports = router;