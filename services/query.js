const config = require("../config/config");
const db = config;

const query = (queryString, values) => {
  return new Promise((resolve, reject) => {
    db.query(queryString, values, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = query;