/* daos/api/productionDao.js */
const db = require('../../config/dbconfig');
const { queryAction } = require('../../helpers/queryAction');

const productionDao = {
  table: 'production',

  /* CREATE */
  create: (req, res) => {
    const { production_name, country, founded_year } = req.body;
    const sql = `INSERT INTO production (production_name, country, founded_year) VALUES (?, ?, ?)`;
    db.query(sql, [production_name, country || null, founded_year || null], (err, result) => {
      if (err) return queryAction(res, err, [], productionDao.table);
      res.status(201).json({ message: 'Production created', production_id: result.insertId });
    });
  },

  /* UPDATE */
  update: (id, req, res) => {
    const { production_name, country, founded_year } = req.body;
    const sql = `UPDATE production SET production_name = ?, country = ?, founded_year = ? WHERE production_id = ?`;
    db.query(sql, [production_name, country || null, founded_year || null, id], (err, result) => {
      if (err) return queryAction(res, err, [], productionDao.table);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Production not found' });
      }
      res.json({ message: 'Production updated', production_id: id });
    });
  },

  /* DELETE */
  deleteById: (id, res) => {
    const sql = `DELETE FROM production WHERE production_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return queryAction(res, err, [], productionDao.table);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Production not found' });
      }
      res.json({ message: 'Production deleted' });
    });
  }
};

module.exports = productionDao;