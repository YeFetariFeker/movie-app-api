const daoCommon = require('./common/daoCommon')

const movieDao = {
    ...daoCommon,
    ...require('./api/movieDao')
}

module.exports = {
    movieDao
}