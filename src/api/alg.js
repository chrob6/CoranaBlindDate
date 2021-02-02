const knex = require('../knex')
const Score = require('../models/score.model')
const Answer = require('../models/users_questions.model')
const Pref = require('../models/preferences.model')
const User= require('../models/user.model')

//await User.query().insert
async function alg(user_id) {

    let pref_gender_user = await User.query().where('id', user_id).select('gender');

    const tab_quest = [];
    for (let id_quest = 1; id_quest < 19; id_quest++) {
        tab_quest[id_quest - 1] = await Answer.query().where('user_id', user_id).where('question_id',id_quest).select('user_choice')//knex('users_questions').where({user_id: user_id,question_id:id_quest}).select('user_choice');
    }

    let user_pref_age = await Pref.query().where('user_id', user_id).select('age');//knex('preferences').where({user_id: user_id}).select('age');
    let user_pref_height = await Pref.query().where('user_id', user_id).select('height');//knex('preferences').where({user_id: user_id}).select('height');
    let user_pref_eyes = await Pref.query().where('user_id', user_id).select('eyes_color');//knex('preferences').where({user_id: user_id}).select('eyes_color');
    let user_pref_hair = await Pref.query().where('user_id', user_id).select('hair_color');//knex('preferences').where({user_id: user_id}).select('hair_color');
    let max = await User.query().count('id', {as:"_max"})


    let s_max = JSON.stringify(max)
    let s_user = s_max.match(/\d+/)[0]
    let s_user_no = parseInt(s_user)

    let id;
    for (id = 1; id < s_user_no + 1 ; id++) {
        let score = 0;
        let pref_gender = await User.query().where('id', id).select('gender_interest');

        if (id == user_id || JSON.stringify(pref_gender_user[0]).substring(JSON.stringify(pref_gender_user[0]).search(":")) !==
            JSON.stringify(pref_gender[0]).substring(JSON.stringify(pref_gender[0]).search(":")))
        {
            continue;
        }

        for (let id_quest = 1; id_quest < 19; id_quest++) {
            let answer = await Answer.query().where('user_id', id).where('question_id',id_quest).select('user_choice')//knex('users_questions').where({user_id: id, question_id: id_quest}).select('user_choice');
            if (JSON.stringify(tab_quest[id_quest - 1][0]) === JSON.stringify(answer[0])) score++;
        }
        console.log(score);
        console.log(JSON.stringify(pref_gender_user[0]).substring(JSON.stringify(pref_gender_user[0]).search(":")));
        console.log(JSON.stringify(pref_gender[0]).substring(JSON.stringify(pref_gender[0]).search(":")));

        let pref_age = await User.query().where('id', id).select('age');//knex('preferences').where({user_id: id}).select('age');
        let pref_height = await User.query().where('id', id).select('height');//knex('preferences').where({user_id: id}).select('height');
        let pref_eyes = await User.query().where('id', id).select('eyes_color');//knex('preferences').where({user_id: id}).select('eyes_color');
        let pref_hair = await User.query().where('id', id).select('hair_color');//knex('preferences').where({user_id: id}).select('hair_color');

        if (JSON.stringify(user_pref_age[0]) === JSON.stringify(pref_age[0])) score++;
        if (JSON.stringify(user_pref_height[0]) === JSON.stringify(pref_height[0])) score++;
        if (JSON.stringify(user_pref_eyes[0]) === JSON.stringify(pref_eyes[0])) score++;
        if (JSON.stringify(user_pref_hair[0]) === JSON.stringify(pref_hair[0])) score++;
        console.log(score);
        //wrzucenie do bazy score

       await Score.query().insert({
            score: score,
            matching_user_id: id,
            user_id: user_id
        });
    }
    return 0;
}






//https://devhints.io/knex#select-1
//http://knexjs.org/#Builder-where
//alg.use('/scores', ScoresRouter)
module.exports = alg;

