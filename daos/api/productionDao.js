 /*----- daos/api/productionDao.js ----- */
const db = require('../../config/dbconfig');
const { queryAction } = require('../../helpers/queryAction'); /*Imports a helper function that standardizes all responses.*/
//const { productionDao } = require('../dao');
 /*--- important for findAll, findById, sort --*/
//const daoCommon = require('../../daoCommon'); 

productionDao = {
  table: 'production',

  // GET /api/production/:id/movies → returns production + their movies
  findMoviesByProduction: (res, table, id) => {  /* Defines the function that runs when someone visits */
    const productionSql = `SELECT * FROM ${table} WHERE ${table}_id = ?`;  /* Builds a safe SQL query to get one director by ID. */
    /*Builds a SQL query to get all movies directed by this person */
    const movieSql = `
      SELECT m.movie_id, m.title, m.yr_released, m.poster, m.rating
      FROM movie m
      WHERE m.director_id = ?
      ORDER BY m.yr_released DESC `;

    /* creats a temporary file production info and list of the movie */
    let production = null;
    let movies = [];

    // Step 1: Get all the movies by id and if error will send error message 500, if success array movieRows
    db.query(movieSql, [id], (err, movieRows) => {
      if (err) return queryAction(res, err, [], table);  /* If the movie quiery fails stops and send an error */
      movies = movieRows;   /* Saves the movies into the movies variables */
            // Step 2: Get director
      db.query(productionSql, [id], (err, productionRows) => {   /* Gets the production personal info like name, nationality ... */
        if (err) return queryAction(res, err, [], table);  /* If the movie quiery fails stops and send an error */
        if (productionRows.length === 0) {  /* If no production exsit send 404 Not Found*/
          return res.status(404).json({ error: 'Production not found' });
        }

        /* Takes the first production from results and add a new field movies */
        production = productionRows[0];
        production.movies = movies;  // clean attach

        res.json(production);  /* Send final JSON to the users */
      });

    });
  
   
    /* UPDATES Query and runs the UPDATE query with values and ID */
     update: (id, req, res) => {
      const { production, production_id, date_created, last_updated } = req.body;
      const sql = `UPDATE production SET production_id = ?, date_created = ?, last_updated = ? WHERE production_id = ?`;
      db.query(sql, [production_id, date_created || null, last_updated || null, id], (err, result) => {
        if (err) return queryAction(res, err, [], productionDao.table);
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Production not found' });
        }
        res.json({ message: 'Production updated', production_id: id });
      });

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
    
    }  

  }    

};

module.exports = productionDao;