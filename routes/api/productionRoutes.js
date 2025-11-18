/* routes/api/productionRoutes.js */
const router = require('express').Router();
const { productionDao: dao } = require('../../daos/dao');

/* GET /api/production → all production companies */
router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});

/* findMoviesByProductionId */
router.get('/get_movies/:id', (req, res)=> {
    dao.findMoviesByProductionId(res, dao.table, req.params.id)
})
/* GET /api/production/:id → one production company */
// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ error: 'Invalid production ID' });
//   dao.findById(id, res);
// });
/*Sort: http://localhost:3000/production/sort/ */
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3000/api/production/5
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

/* POST /api/production → create new production company */
router.post('/', (req, res) => {
  const { production, production_id, date_created, last_updated  } = req.body;
  if (!production_id) {
    return res.status(400).json({ error: 'production_id is required' });
  }
  dao.create(req, res);
});

/* PUT /api/production/:id → update existing */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid production ID' });

  const { production, production_id, date_created, last_updated } = req.body;
  if (!production_id) {
    return res.status(400).json({ error: 'production_id is required' });
  }
  dao.update(id, req, res);
});

/* DELETE /api/production/:id */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid production ID' });
  dao.deleteById(id, res);
});

module.exports = router;