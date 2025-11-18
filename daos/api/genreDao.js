// daos/api/genreDao.js
const db = require('../../config/dbconfig')  // ← fixed: use `db`, not `con`
const { queryAction } = require('../../helpers/queryAction')

const genreDao = {
  table: 'genre',

  
  // POST /api/genre → create new *** move to daoCommon***
  create: (req, res) => {
    const { genre } = req.body;
    if (!genre) {
      return res.status(400).json({ error: 'genre is required' });
    }

    const sql = `INSERT INTO genre (genre) VALUES (?)`;
    db.query(sql, [genre], (err, results) => {
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