/* routes/api/directorRoutes.js */
const router = require('express').Router();
const { directorDao: dao } = require('../../daos/dao');

/* GET /api/director → all directors */
router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});

/* GET /api/director/:id → single director */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid director ID' });
  dao.findById(res, dao.table, id);
});

// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   dao.findById(res, id);
// });

/* GET /api/director/:id/movies → movies directed by this director */
router.get('/:id/movies', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid director ID' });
  dao.findMoviesByDirector(res, dao.table, id);
});

/* GET /api/director/sort/:sorter → sorted list */
router.get('/sort/:sorter', (req, res) => {
  const sorter = req.params.sorter;
  // `dao.sort` already whitelists columns in daoCommon.js
  dao.sort(res, dao.table, sorter);
});
// router.get('/sort/:sorter', (req, res) => {
//   dao.sort(res, req.params.sorter);
// });

/* POST /api/director → create new director */
router.post('/', (req, res) => {
  const { fName, lName, nationality_id } = req.body;
  if (!fName || !lName) {
    return res.status(400).json({ error: 'fName and lName are required' });
  }

  if (typeof dao.create === 'function') {
    dao.create(req, res);
  } else {
    res.status(501).json({ error: 'Create not implemented' });
  }
});

module.exports = router;