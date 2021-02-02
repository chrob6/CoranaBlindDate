exports.up = function(knex) {
    return knex.schema.createTable('questions',(table) => {
        table.increments().primary();
        table.string('content').notNullable();
        table.string('a_answer').notNullable();
        table.string('b_answer').notNullable();
        table.string('c_answer').notNullable();
        table.string('d_answer').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('questions');
};