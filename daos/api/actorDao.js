const db = require('../../config/dbconfig')  /* connect to MySQL db, db is the database pool that lets SQL queries run safely */
const { queryAction } = require('../../helpers/queryAction')  /*import a helper function that standardize all repsponse, sends query succeeds JSON orif error sends 500 error message */

const actorDao = {  /* creates Actor DAO object and tells it (you are responsble for Actor table in db) */
  table: 'actor',

  // GET: /api/actor/:id/movies → returns actor + list of movies
  findMoviesByActor: (res, table, id) => {   /* defines a function called when someone visits */
    // Step 1: Get the actor
    const actorSql = `SELECT * FROM ${table} WHERE ${table}_id = ?`; /* Build a safe SQL to get one actor by ID. (? -> prevents SQL injection) */ 
    const movieSql = `
      SELECT m.movie_id, m.title, m.yr_released, m.poster
      FROM movie m
      JOIN movie_to_actor ma ON m.movie_id = ma.movie_id  
      WHERE ma.actor_id = ?
      ORDER BY m.yr_released DESC
    `;
     /* Creeats temporary variable to store */
    let actor = null;
    let movies = [];

    // 1. Get movies
    db.query(movieSql, [id], (err, movieRows) => {
      if (err) {
        return queryAction(res, err, [], table);
      }
      movies = movieRows;

      // 2. Get actor
      db.query(actorSql, [id], (err, actorRows) => {
        if (err) {
          return queryAction(res, err, [], table);
        }
        if (actorRows.length === 0) {
          return res.status(404).json({ error: 'Actor not found' }); /* if no actor exsit with that ID send */
        }

        
        actor = actorRows[0];  /*takes the first actor from result */
        actor.movies = movies;  /* adds a new field*/// attach cleanly

        res.json(actor);  /* clean readable JSON res */
      });
    });
  },

  // POST /api/actor → create new actor
  create: (req, res) => {
    const { first_name, last_name, img_url } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'first_name and last_name are required' });
    }

    const sql = `INSERT INTO actor (first_name, last_name, img_url) VALUES (?, ?, ?)`;
    db.query(sql, [first_name, last_name, img_url || null], (err, result) => {
      if (err) return queryAction(res, err, [], 'actor');
      res.status(201).json({
        message: 'Actor created',
        actor_id: result.insertId
      });
    });
  }


};

module.exports = actorDao;  /* make the actorDao available to actorRouter.js */

