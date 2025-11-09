/* daoCommon.js, base helper for db access, such as select all or findById */
const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

    /* create methods that will query the database */
    findAll: (req, res, table)=> {

        /* .query makes an arg(sql query, callback func) */
        connect.query(
             `SELECT * FROM ${table};`,  /*sql query */
            (error,  rows)=> {   /*callback func */
                queryAction(res, error, rows, table)
                // if (!error) {
                //     if (rows.length === 1) {
                //         res.json(...rows)
                //     } else {
                //         res.json(rows)
                //     }
                // } else {
                //     console.log(`Dao Error: ${error}`)
                //     res.json({
                //         "message": 'error',
                //         'table': `${table}`,
                //         'error': error
                //     })
                // }
            }
        )           
    },

    findById: (res, table, id) => {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    res.json(...rows)
                } else {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })
                }
            }
        )
    },

    sort: (res, table, sorter)=> {

        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,

            (error, rows)=> {
               queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = daoCommon