const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                email: {
                    type: String,
                    required: true,
                    unique: true,
                    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                },
                password: { type: String,required: true },
                first_name: {type: 'string'},
                last_name: {type: 'string'},
                city: {type: 'string'},
                age:  {type: 'int'},
                height:  {type: 'int'},
                gender: {enum: ['Male', 'Female']},
                gender_interest: {enum: ['Male', 'Female', 'Both']},
                eyes_color: {enum: ['Amber','Blue', 'Brown','Gray','Green','Hazel']},
                hair_color: {enum: ['Blonde', 'Dark Blonde', 'Light Brown','Dark brown', 'Red', 'Bold']}
            }
        }
    }
    static get relationMappings() {
        return {
            preference_relation : {
                relation: Model.HasOneRelation,
                modelClass:  require('./preferences.model'),
                join: {
                    from: 'users.id',
                    to: 'preferences.user_id'
                }
            },
            score_relation : {
                relation: Model.HasManyRelation,
                modelClass:  require('./score.model'),
                join: {
                    from: 'users.id',
                    to: 'scores.user_id'
                }
            },
            answer_relation : {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./users_questions.model'),
                join: {
                    from: 'users.id',
                    to: 'users_questions.user_id'
                }
            }
            // question_relation : {
            //     relation: Model.ManyToManyRelation,
            //     modelClass:  require('./question.model'),
            //     join: {
            //         from: 'users.id',
            //         to: 'questions_id',
            //         through: {
            //             from: 'users_questions.user_id',
            //             to: 'users_questions.question_id'
            //         },
            //     }
            // }
        }
    }
}

module.exports = User;

