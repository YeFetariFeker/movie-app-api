/* routes/api/platformRoutes.js */
const router = require('express').Router();
const { platformDao: dao } = require('../../daos/dao');

/* GET /api/platform → all streaming platforms */
router.get('/', (req, res) => {
  dao.findAll(res);
});

/* GET /api/platform/:id → single platform by ID */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid platform ID' });
  }
  dao.findById(id, res);  // ← correct order: (id, res)
});

module.exports = router;