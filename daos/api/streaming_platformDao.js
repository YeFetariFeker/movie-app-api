/* daos/api/platformDao.js */
const db = require('../../config/dbconfig')          // ← correct path
const { queryAction } = require('../../helpers/queryAction')

const streaming_platformDao = {
  table: 'streaming_platform',

  /* ---------- GET ALL ---------- */
  findAll: (res) => {
    const sql = `SELECT * FROM streaming_platform ORDER BY streaming_platform_id`;
    db.query(sql, (err, rows) => queryAction(res, err, rows, streaming_platformDao.table));
  },

  /* ---------- GET ONE ---------- */
  findById: (res, id) => {
    const sql = `SELECT * FROM streaming_platform WHERE streaming_platform_id = ?`;
    db.query(sql, [id], (err, rows) => {
      if (err) return queryAction(res, err, [], streaming_platformDao.table);
      if (rows.length === 0) return res.status(404).json({ error: 'streaming_platform not found' });
      res.json(rows[0]);
    });
  },

  /* ---------- CREATE ---------- */
  create: (req, res) => {
    const {platform_name } = req.body;
    if (!platform_name) {
      return res.status(400).json({ error: 'platform_name is required' });
    }

    const sql = `INSERT INTO streaming_platform (platform_name) VALUES (?)`;
    db.query(sql, [platform_name], (err, result) => {
      if (err) return queryAction(res, err, [], streaming_platformDao.table);
      res.status(201).json({
        message: 'streaming_platform created',
        streaming_platform_id: result.insertId
      });
    });
  },

  /* ---------- DELETE ---------- */
  deleteById: (id, res) => {
    const sql = `DELETE FROM streaming_platform WHERE streaming_platform_id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) return queryAction(res, err, [], streaming_platformDao.table);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Streaming_platform not found' });
      }
      res.json({ message: 'Streaming_platform deleted' });
    });
  }
};
module.exports = streaming_platformDao;
