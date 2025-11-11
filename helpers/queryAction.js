/* helpers/queryAction.js */
const queryAction = (res, err, rows, table) => {
  if (err) {
    console.error(`DAO Error [${table}]:`, err);
    return res.status(500).json({
      message: 'Database error',
      table,
      error: err.message || String(err)   // ← fixed: `error` → `err`
    });
  }

  // Single row → return object, not array
  if (rows.length === 1) {
    return res.json(rows[0]);
  }

  // Empty result → still return array (front-end can handle [])
  res.json(rows);
};

module.exports = { 
  queryAction 
};