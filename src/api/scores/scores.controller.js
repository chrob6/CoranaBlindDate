const {Router} = require('express')
const Scores = require('../../models/score.model')
const User = require('../../models/user.model')
const asyncHandler = require("../async-handler")
const alg = require('../alg')

const router = new Router();

// POST /api/scores/:id_user
router.post('/:id_user', asyncHandler(async (req, res) => {
    const id_user = req.params.id_user;
    await alg(id_user);

    res.status(201).end();
}))

// POST /api/scores/:id_user
router.get('/:id_user', asyncHandler(async (req, res) => {
    const id_user = req.params.id_user;

    const score = await Scores.query().select( 'score','matching_user_id')
                                    .where('user_id', id_user)
                                    .orderBy('score','desc')

    let s_matching_user = JSON.stringify(score[0])
    let end = s_matching_user.lastIndexOf("\"")
    let start = s_matching_user.lastIndexOf("\"", end-1)
    s_matching_user = s_matching_user.substring(start+1,end)
    let id_matching_user = parseInt(s_matching_user)

    const user= await User.query().select('first_name', 'last_name','city','age','height','eyes_color','hair_color')
                                    .where('id', id_matching_user)

    res.send(user);
}))

module.exports = router;