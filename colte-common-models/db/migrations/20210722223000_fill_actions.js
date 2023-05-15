exports.up = function (knex) {
  return knex.transaction((trx) => {
    return trx
      .insert([
        {action: "TRANSFER"},
        {action: "PURCHASE"},
        {action: "ADMIN_TOPUP"},
        {action: "ADMIN_TRANSFER"},
      ])
      .into("actions");
  });
};

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
    return trx("actions")
      .whereIn("action", ["TRANSFER", "PURCHASE", "ADMIN_TOPUP", "ADMIN_TRANSFER"])
      .del();
  });
};

exports.down = function (knex) {
  return knex.transaction((trx) => {
    return trx("type_customers")
      .whereIn("name", ["MBB", "MiFi"])
      .del();
  });
};
