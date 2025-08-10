/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('name').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('notes', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title', 200);
    table.text('content');
    table.boolean('pinned').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted_at').nullable();
  })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('notes');
};
