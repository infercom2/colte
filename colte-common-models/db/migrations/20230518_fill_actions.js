exports.up = function (knex) {
  return knex.transaction((trx) => {
    return trx
      .insert([
        {name: "MBB"},
        {name: "MiFi"},
      ])
      .into("type_customers");
  });
};

exports.down = function (knex) {
  return knex.transaction((trx) => {
    return trx("type_customers")
      .whereIn("name", ["MBB", "MiFi"])
      .del();
  });
};
