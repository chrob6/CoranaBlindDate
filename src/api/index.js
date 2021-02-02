const {Router} = require('express')
const usersRouter = require('./users/users.controller')
const questionsRouter = require('./questions/questions.controller')
const preferencesRouter = require('./preferences/preferences.controller')
const AnswersRouter = require('./users_questions/users_questions.controller')
const ScoresRouter = require('./scores/scores.controller')


const router = new Router();


router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/preferences', preferencesRouter)
router.use('/users_questions', AnswersRouter)
router.use('/scores', ScoresRouter)


module.exports = router;