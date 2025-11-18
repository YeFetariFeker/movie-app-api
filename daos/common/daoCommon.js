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
      if (err) return queryAction(res, err, rows, table);
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
      actor: ['first_name', 'last_name'],
      director: ['first_name', 'last_name'],
      genre: ['genre', 'genre_id', 'date_created', 'last_update'],
      production: ['production','production_id', 'date_created', 'last_updated'], 
      streaming_platform: ['streaming_platform', 'streaming_platform_id', 'date_created','last_update'],
      
    }; 

    const safeCols = allowed[table] || [];
    if (!safeCols.includes(sorter)) {
      return res.status(400).json({ error: 'Invalid sort field' });
    }

    const sql = `SELECT * FROM ${table} ORDER BY ${sorter}`;
    db.query(sql, (err, rows) => queryAction(res, err, rows, table));
  },

  create: (req, res, table)=> {
    // req.body => {}
    if (Object.keys(req.body).length === 0) {
      // Object.keys(obj) => array of keys
      res.json({
        "error": true,
        "message": "No fields to create"
      })

    } else {
      const fields = Object.keys(req.body)
      const values = Object.values(req.body)

      connect.execute(
        `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
        values,
        (error, dbres)=> {
          if (!error) {
            /*res.json({
              Last_id: dbres.insertId
            }) */
            console.log(dbres)
            res.render('pages/success', {
            title: 'Success',
            name: 'Success'

            })

          } else {
            console.log(`${table}Dao error: `, error)
          }

        }

      )

    }   
              
  }         
      
};

module.exports = daoCommon;

  




  






  






