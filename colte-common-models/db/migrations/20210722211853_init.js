exports.up = function (knex) {
  return knex.schema
    .createTable("currencies", (table) => {
      table.increments("id").notNullable().primary();
      table.string("code", 3).notNullable().unique();
      table.string("name", 32).notNullable();
      table.string("symbol", 8).notNullable();
    })
    .createTable("type_customers", (table) =>{
      table.increments("id").notNullable().primary();
      table.string("name").notNullable();
    })
    .createTable("customers", (table) => {
      table.increments("id").notNullable().primary();
      table.string("imsi", 16).notNullable().unique();
      table.string("username", 50).notNullable();
      table.decimal("balance", 15, 4).notNullable().defaultTo(0);
      table.integer("currency").notNullable().references("currencies.id");
      table.boolean("enabled").notNullable().defaultTo(true);
      table.boolean("admin").notNullable().defaultTo(false);
      table.string("msisdn", 16).notNullable();
      table.bigInteger("pending_data_balance");
      table.uuid("pending_data_balance_txn");
      table.integer("type").references("type_customers.id").defaultTo(1);

    })
    .createTable("actions", (table) => {
      table.increments("id").notNullable().primary();
      table.string("action").notNullable();
    })
    .createTable("audit_customers", (table) => {
      table.timestamp("time").notNullable();
      table.integer("customer").notNullable().references("customers.id");
      table.integer("action").notNullable().references("actions.id");
      table.decimal("new_balance", 15, 4).notNullable();
      table.boolean("new_enabled").notNullable();
      table.boolean("new_admin").notNullable();
      table.boolean("new_msisdn").notNullable();
      table.json("action_payload").notNullable();
      table.primary(["time", "customer"]);
    })
    .createTable("packages", (table) => {
      table.increments("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("type_package").notNullable();
      table.string("type_users").notNullable().references("customers.type").defaultTo(1);
      table.integer("days_of_use");
    })
    .createTable("topup_sales_history", (table) => {
      table.increments("id").notNullable().primary();
      table.timestamp("date").notNullable();
      table.string("imsi", 16).notNullable();
      table.integer("amount").notNullable();
    } ) 
    .createTable("packages_sales_history", (table) => {
      table.increments("id").notNullable().primary();
      table.timestamp("date").notNullable();
      table.string("imsi",16).notNullable();
      table.integer("cost").notNullable();
      table.bigInteger("data_mb");
    })
    .createTable("transfers_history", (table) => {
      table.increments("id").notNullable().primary();
      table.timestamp("date").notNullable();
      table.string("sender_imsi",16).notNullable();
      table.string("receiver_imsi",16).notNullable();
      table.integer("amount").notNullable();
      table.string("type_transfer",50).notNullable();
    });

};

exports.down = function (knex) {
  return knex.schema
    .dropTable("audit_customers")
    .dropTable("customers")
    .dropTable("currencies")
    .dropTable("actions")
    .dropTable("packages")
    .dropTable("topup_sales_history")
    .dropTable("packages_sales_history")
    .dropTable("transfers_history");
};
