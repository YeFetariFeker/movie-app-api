const queryAction =(obj, e, r, t)=> {   /**e= error, r= rows, t= table */

    if (!e) {
        if (r.length === 1) {
            obj.json(...r)
        } else {
            obj.json(r)
        }
    } else {
        console.log(`DAO Error: ${e}`)
        obj.json({
            "message": 'error',
            'table': `${t}`,
            'error': error
        })
    }
}

module.exports = {
    queryAction
}