const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class Score extends BaseModel {
    static get tableName() {
        return 'scores';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                score:  {type: 'int'},
                matching_user_id:  {type: 'int'},
            }
        }
    }

    static relationMappings = {
        user_relation : {
            relation: Model.BelongsToOneRelation,
            modelClass: require('./user.model'),
            join: {
                from: 'scores.user_id',
                to: 'users.id'
            }
        }
    };
}

module.exports = Score;