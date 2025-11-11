/* daos/common/daoCommon.js */
const db = require('../../config/dbconfig')               // ← use `db` (consistent with other DAOs)
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

  /* ---------- FIND ALL ---------- */
  findAll: (res, table) => {
    const sql = `SELECT * FROM ${table}`;
    db.query(sql, (err, rows) => queryAction(res, err, rows, table));
  },

  /* ---------- FIND BY ID (SQL-Injection safe) ---------- */
  findById: (res, table, id) => {
    const sql = `SELECT * FROM ${table} WHERE ${table}_id = ?`;   // ← ? placeholder
    db.query(sql, [id], (err, rows) => {
      if (err) return queryAction(res, err, [], table);
      if (rows.length === 0) {
        return res.status(404).json({ error: `${table} not found` });
      }
      res.json(rows[0]);   // single object, not array
    });
  },

  /* ---------- SORT (whitelist columns to prevent injection) ---------- */
  sort: (res, table, sorter) => {
    // Whitelist allowed columns per table (add more as needed)
    const allowed = {
      movie: ['title', 'yr_released', 'rating', 'gross'],
      actor: ['fName', 'lName'],
      director: ['fName', 'lName'],
      genre: ['genre_name'],
      streaming_platform: ['platform_name'],
      // ... add others
    };

    const safeCols = allowed[table] || [];
    if (!safeCols.includes(sorter)) {
      return res.status(400).json({ error: 'Invalid sort field' });
    }

    const sql = `SELECT * FROM ${table} ORDER BY ${sorter}`;
    db.query(sql, (err, rows) => queryAction(res, err, rows, table));
  }
};

module.exports = daoCommon;


