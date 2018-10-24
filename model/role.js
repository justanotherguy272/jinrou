module.exports = {
  getRoles: () => {
    return new Promise((resolve, reject) => {
      let role_query = "SELECT * FROM `roles`";
      db.query(role_query, (err, result) => {
        if(!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    })
  },
}