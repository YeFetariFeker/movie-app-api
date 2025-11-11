/* daos/dao.js – central DAO registry */
const daoCommon = require('./common/daoCommon');

/* ---------- API-specific DAOs ---------- */
const movieDao             = { ...daoCommon, ...require('./api/movieDao') };
const actorDao             = { ...daoCommon, ...require('./api/actorDao') };
const directorDao          = { ...daoCommon, ...require('./api/directorDao') };
const genreDao             = { ...daoCommon, ...require('./api/genreDao') };
const productionDao        = { ...daoCommon, ...require('./api/productionDao') };
const streamingPlatformDao = { ...daoCommon, ...require('./api/streaming_platformDao') };

module.exports = {
  movieDao,
  actorDao,
  directorDao,
  genreDao,
  productionDao,
  streamingPlatformDao
};



