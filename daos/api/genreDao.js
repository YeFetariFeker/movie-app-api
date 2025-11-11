// daos/api/genreDao.js
const db = require('../../config/dbconfig')  // ← fixed: use `db`, not `con`
const { queryAction } = require('../../helpers/queryAction')

const genreDao = {
  table: 'genre',

  // GET /api/genre → all genres
  findAll: (res) => {
    const sql = `SELECT * FROM genre ORDER BY genre_name`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching genres:', err);
        return res.status(500).json({ error: 'Failed to fetch genres' });
      }
      res.json(results);
    });
  },

  // GET /api/genre/:id → one genre
  findById: (id, res) => {  // ← fixed: findById
    const sql = `SELECT * FROM genre WHERE genre_id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error fetching genre:', err);  // ← fixed syntax
        return res.status(500).json({ error: 'Failed to fetch genre' });
      }
      if (results.length === 0) {  // ← fixed: length
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(results[0]);
    });
  },

  // POST /api/genre → create new
  create: (req, res) => {
    const { genre_name } = req.body;
    if (!genre_name) {
      return res.status(400).json({ error: 'genre_name is required' });
    }

    const sql = `INSERT INTO genre (genre_name) VALUES (?)`;
    db.query(sql, [genre_name], (err, results) => {
      if (err) {
        console.error('Error creating genre:', err);
        return res.status(500).json({ error: 'Failed to create genre' });
      }
      res.status(201).json({
        message: 'Genre added',
        genre_id: results.insertId
      });
    });
  },

  // DELETE /api/genre/:id
  deleteById: (id, res) => {
    const sql = `DELETE FROM genre WHERE genre_id = ?`;  // ← fixed: FROM
    db.query(sql, [id], (err, results) => {  // ← fixed: sql, not SVGViewElement
      if (err) {
        console.error('Error deleting genre:', err);
        return res.status(500).json({ error: 'Failed to delete genre' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json({ message: 'Genre deleted successfully' });
    });
  }
};

module.exports = genreDao;