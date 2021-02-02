exports.up = function(knex) {
    return knex.schema.createTable('preferences',(table) => {
        table.increments().primary();
        table.integer('age').notNullable();
        table.integer('height').notNullable();
        table.enum('eyes_color', ['Amber','Blue', 'Brown','Gray','Green','Hazel','?']).notNullable();
        table.enum('hair_color',['Blonde', 'Dark Blonde', 'Light Brown','Dark brown', 'Red', 'Bold','?']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('user_id').unique().references('users.id').onDelete('CASCADE');
    }).createTable('scores',(table) => {
        table.increments().primary();
        table.integer('score').notNullable();
        table.string('matching_user_id').notNullable();
        table.integer('user_id').references('users.id').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    }).createTable('users_questions',(table) => {
        table.increments().primary();
        table.integer('question_id').references('questions.id').onDelete('CASCADE');
        table.integer('user_id').references('users.id').onDelete('CASCADE');
        table.enum('user_choice', ['a', `b`,'c','d','?']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {

};