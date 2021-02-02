const {Router} = require('express')
const Question = require('../../models/question.model')
const asyncHandler = require("../async-handler");
const QuestionNotFoundException = require("../../exceptions/question-not-found.exception");

const router = new Router();

// POST /api/preferences
router.post('/', asyncHandler(async (req, res) => {
    const question = await Question.query().insert({
        first_name: req.body.first_name,
        content: req.body.content,
        a_answer: req.body.a_answer,
        b_answer: req.body.b_answer,
        c_answer: req.body.c_answer,
        d_answer: req.body.d_answer,
        user_choice: req.body.user_choice
    });
    res.status(201).send(question);
}))

router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.query().select("content", "a_answer", "b_answer", "c_answer", "d_answer");
    res.send(questions);
}))

// GET /api/questions/1
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const question = await Question.query().select("content", "a_answer", "b_answer", "c_answer", "d_answer").findById(id);
    if(!question) throw new QuestionNotFoundException();

    res.send(question);
}))

module.exports = router;