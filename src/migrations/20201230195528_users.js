exports.up = function(knex) {
    return knex.schema.createTable('users',(table) => {
        table.increments().primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('city').notNullable();
        table.integer('age').notNullable();
        table.integer('height').notNullable();
        table.enum('gender', ['Male', 'Female']).notNullable();
        table.enum('gender_interest',['Male', 'Female', 'Both']).notNullable();
        table.enum('eyes_color', ['Amber','Blue', 'Brown','Gray','Green','Hazel']).notNullable();
        table.enum('hair_color',['Blonde', 'Dark Blonde', 'Light Brown','Dark brown', 'Red', 'Bold']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};