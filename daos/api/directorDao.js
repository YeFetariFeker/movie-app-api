/*---- daos/api/directorDao.js ---*/
const db = require('../../config/dbconfig')   /* Imorts MySQL db connection pool from config file and allow SQL queries to run */
const { queryAction } = require('../../helpers/queryAction')  /* Imports a shared helper function standardize all API res, including success JSON and error 500 with error message* */

//const daoCommon = require('../daoCommon'); /* FIXED PATH */

/*Creates the Director DAO object and tells it "You are in charge of the director table." */
const directorDao = {
  table: 'director',

  // GET /api/director/:id/movies → returns director + their movies
  findMoviesByDirector: (res, table, id) => {  /* Defines the function that runs when someone visits */
    const directorSql = `SELECT * FROM ${table} WHERE ${table}_id = ?`;  /* Builds a safe SQL query to get one director by ID. */
    /*Builds a SQL query to get all movies directed by this person */
    const movieSql = `
      SELECT m.movie_id, m.title, m.yr_released, m.poster, m.rating
      FROM movie m
      WHERE m.director_id = ?
      ORDER BY m.yr_released DESC
    `;

    /* creats a temporary file director info and list of the movie */
    let director = null;
    let movies = [];

    // Step 1: Get all the  movies,  by id and if error will send error message 500, if success array movieRows
    db.query(movieSql, [id], (err, movieRows) => {
      if (err) return queryAction(res, err, [], table);  /* If the movie quiery fails stops and send an error */
      movies = movieRows;   /* Saves the movies into the movies variables */

      // Step 2: Get director
      db.query(directorSql, [id], (err, directorRows) => {   /* Gets the director personal info like name, nationality ... */
        if (err) return queryAction(res, err, [], table);  /* If the movie quiery fails stops and send an error */
        if (directorRows.length === 0) {  /* If no directory exsit send 404 Not Found*/
          return res.status(404).json({ error: 'Director not found' });
        }

        /* Takes the first director from results and add a new field movies */
        director = directorRows[0];
        director.movies = movies;  // clean attach

        res.json(director);  /* Send final JSON to the users */
      });
    });
  }
};

module.exports = directorDao;