const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class Preference extends BaseModel {
    static get tableName() {
        return 'preferences';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                age:  {type: 'int'},
                height:  {type: 'int'},
                eyes_color: {enum: ['Amber','Blue', 'Brown','Gray','Green','Hazel','?']},
                hair_color: {enum: ['Blonde', 'Dark Blonde', 'Light Brown','Dark brown', 'Red', 'Bold','?']}
            }
        }
    }

    static relationMappings = {
        user_relation : {
            relation: Model.BelongsToOneRelation,
            modelClass: require('./user.model'),
            join: {
                from: 'preferences.user_id',
                to: 'users.id'
            }
        }
    };
}

module.exports = Preference;