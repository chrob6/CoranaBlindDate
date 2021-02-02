const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class Answer extends BaseModel {
    static get tableName() {
        return 'users_questions';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                user_choice: {enum: ['a', 'b', 'c','d','?']}
            }
        }
    }

    static get relationMappings() {
        return {
            user_relation : {
                relation: Model.HasManyRelation,
                modelClass:  require('./user.model'),
                join: {
                    from: 'users_questions.user_id',
                    to: 'users.id',
                }
            },
            question_relation : {
                relation: Model.HasManyRelation,
                modelClass:  require('./question.model'),
                join: {
                    from: 'users_questions.question_id',
                    to: 'questions.id'
                }
            },
        }
    }


}

module.exports = Answer;