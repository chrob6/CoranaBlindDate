const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class Question extends BaseModel {
    static get tableName() {
        return 'questions';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                content: {type: 'string'},
                a_answer: {type: 'string'},
                b_answer: {type: 'string'},
                c_answer:  {type: 'string'},
                d_answer:  {type: 'string'},
                //user_choice: {enum: ['a', 'b', 'c','d','?']}
            }
        }
    }

    static relationMappings = {
        answer_relation : {
            relation: Model.BelongsToOneRelation,
            modelClass: require('./users_questions.model'),
            join: {
                from: 'questions.id',
                to: 'users_questions.question_id'
            }
        }
    };
}

module.exports = Question;