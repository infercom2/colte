exports.up = function (knex) {
  return knex.transaction((trx) => {
    return trx.insert([{code: "MXN", name: "MXN", symbol: "$"}]).into("currencies");
  });
};

exports.down = function (knex) {
  return knex.transaction((trx) => {
    return trx("currencies").where("code", "=", "XXX").del();
  });
};
