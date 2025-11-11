/* daos/api/movieDao.js – full movie info with nested actors, directors, genres, platforms */
const db = require('../../config/dbconfig');
const { queryAction } = require('../../helpers/queryAction');

const movieDao = {
  table: 'movie',

  findMovieInfo: (res, table) => {
    const sql = `
      SELECT
        m.movie_id,
        m.title,
        m.rating,
        m.runtime,
        m.nationality,
        m.yr_released,
        m.budget,
        m.gross,
        m.production_id,
        m.showing,
        m.poster,

        /* ---------- Actors ---------- */
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN a.actor_id IS NOT NULL THEN
              JSON_OBJECT(
                'actor_id', a.actor_id,
                'fName',    COALESCE(a.first_name, ''),
                'lName',    COALESCE(a.last_name, ''),
                'img_url',  COALESCE(a.img_url, '')
              )
            END
          ),
          JSON_ARRAY()
        ) AS actors,

        /* ---------- Directors ---------- */
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN d.director_id IS NOT NULL THEN
              JSON_OBJECT(
                'director_id', d.director_id,
                'fName',       COALESCE(d.first_name, ''),
                'lName',       COALESCE(d.last_name, '')
              )
            END
          ),
          JSON_ARRAY()
        ) AS directors,

        /* ---------- Genres ---------- */
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN g.genre_id IS NOT NULL THEN
              JSON_OBJECT(
                'genre_id', g.genre_id,
                'genre',    COALESCE(g.genre, '')
              )
            END
          ),
          JSON_ARRAY()
        ) AS genres,

        /* ---------- Streaming Platforms ---------- */
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN sp.streaming_platform_id IS NOT NULL THEN
              JSON_OBJECT(
                'platform_id', sp.streaming_platform_id,
                'platform',    COALESCE(sp.streaming_platform, '')
              )
            END
          ),
          JSON_ARRAY()
        ) AS streamingPlatforms

      FROM movie m
      LEFT JOIN movie_to_actor       ma ON m.movie_id = ma.movie_id
      LEFT JOIN actor               a  ON ma.actor_id = a.actor_id
      LEFT JOIN movie_to_director   md ON m.movie_id = md.movie_id
      LEFT JOIN director            d  ON md.director_id = d.director_id
      LEFT JOIN movie_to_genre      mg ON m.movie_id = mg.movie_id
      LEFT JOIN genre               g  ON mg.genre_id = g.genre_id
      LEFT JOIN movie_to_streaming  ms ON m.movie_id = ms.movie_id
      LEFT JOIN streaming_platform  sp ON ms.streaming_platform_id = sp.streaming_platform_id

      GROUP BY m.movie_id
      ORDER BY m.movie_id;
    `;

    /* Run the SQL query. When it's done, send the results to the user — or show an error if something went wrong. */
    db.query(sql, (error, rows) => {
      queryAction(res, error, rows, table);
    });
  }
};

module.exports = movieDao;