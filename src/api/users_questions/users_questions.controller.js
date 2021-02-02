const {Router} = require('express')
const Answer = require('../../models/users_questions.model')
const asyncHandler = require("../async-handler");

const router = new Router();

// POST /api/users_questions
router.post('/:id_user/:id_question', asyncHandler(async (req, res) => {
    const id_user = req.params.id_user;
    const id_question = req.params.id_question;
    const answer = await Answer.query().insert({
        question_id: id_question,
        user_id: id_user,
        user_choice: req.body.user_choice,
    });
    res.status(201).send(answer);
}))

// GET /api/users_questions/1/2 -- /user/question
router.get('/:id_user/:id_question', asyncHandler(async (req, res) => {
    const id_user = req.params.id_user;
    const id_question = req.params.id_question;
    const answer = await Answer
        .query()
        .select('user_choice')
        .where("user_id", id_user)
        .where("question_id", id_question)
        .withGraphJoined("user_relation")
        .withGraphJoined("question_relation")
        .modifyGraph("user_relation", builder=> builder.select('first_name', 'last_name'))
        .modifyGraph("question_relation", builder=> builder.select('content', ))



    // if(!user) throw new UserNotFoundException();

    res.send(answer);
}))



module.exports = router;