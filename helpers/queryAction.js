/* helpers/queryAction.js */
const queryAction = (obj, e, r, t) => {
  if (e) {
    console.error(`DAO Error [${t}]:`, e);
    return obj.status(500).json({
      message: 'Database error',
      t,
      error: e.message || String(e)   // ← fixed: `error` → `err`
    });
  }

  // Single row → return object, not array
  if (r.length === 1) {
    return obj.json(r[0]);
  }

  // Empty result → still return array []
  obj.json(r);
};

module.exports = { 
  queryAction 
};