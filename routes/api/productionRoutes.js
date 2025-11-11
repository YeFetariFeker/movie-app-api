/* routes/api/productionRoutes.js */
const router = require('express').Router();
const { productionDao: dao } = require('../../daos/dao');

/* GET /api/production → all production companies */
router.get('/', (req, res) => {
  dao.findAll(res);
});

/* GET /api/production/:id → one production company */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid production ID' });
  dao.findById(id, res);
});

/* POST /api/production → create new production company */
router.post('/', (req, res) => {
  const { production_name, country, founded_year } = req.body;
  if (!production_name) {
    return res.status(400).json({ error: 'production_name is required' });
  }
  dao.create(req, res);
});

/* PUT /api/production/:id → update existing */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid production ID' });

  const { production_name, country, founded_year } = req.body;
  if (!production_name) {
    return res.status(400).json({ error: 'production_name is required' });
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