/* routes/api/platformRoutes.js */
const router = require('express').Router();
const { streaming_platformDao: dao } = require('../../daos/dao');

/* GET /api/platform → all streaming streaming_platforms */
router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});

/* http://localhost:3000/api/streaming_platform/sort/date_created */
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/get_streaming_platform/:id', (req, res)=> {
    dao.findById(res, req.params.id)
})

/* GET /api/platform/:id → single platform by ID */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid streaming_platform ID' });
  }
  dao.findById(res, dao.table, id);  // ← correct order: (id, res)
});

module.exports = router;
