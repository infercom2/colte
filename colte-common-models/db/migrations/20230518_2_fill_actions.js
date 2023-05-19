exports.up = function (knex) {
  return knex.transaction((trx) => {
    return trx
      .insert([
        {name: "BASIC 1", print_bytes: "1 GB", cost: "25", bytes_value: "1000000000",type_package: "2", type_user: "1"},
        {name: "BASIC 1", print_bytes: "3 GB", cost: "38", bytes_value: "3000000000",type_package: "2", type_user: "1"},
        {name: "BASIC 2", print_bytes: "5 GB", cost: "65", bytes_value: "5000000000",type_package: "1", type_user: "1"},
        {name: "MEDIUM 1", print_bytes: "10 GB", cost: "95", bytes_value: "10000000000",type_package: "1", type_user: "1"},
        {name: "MEDIUM 2", print_bytes: "20 GB", cost: "110", bytes_value: "20000000000",type_package: "1", type_user: "1"},
        {name: "HIGHT 1", print_bytes: "40 GB", cost: "170", bytes_value: "40000000000",type_package: "1", type_user: "1"},
        {name: "HIGHT 2", print_bytes: "80 GB", cost: "270", bytes_value: "80000000000",type_package: "1", type_user: "2"},

      ])
      .into("packages");
  });
};

exports.down = function (knex) {
  return knex.transaction((trx) => {
    return trx("packages")
      .whereIn("name", ["BASIC 1", "BASIC 2", "MEDIUM 1", "MEDIUM 2", "HIGHT 1", "HIGHT 2"])
      .del();
  });
};