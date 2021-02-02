const {Router} = require('express')
const Preference = require('../../models/preferences.model')
const asyncHandler = require("../async-handler");
const UserNotFoundException = require("../../exceptions/user-not-found.exception");

const router = new Router();

// POST /api/preferences
router.post('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const preference = await Preference.query().insert({
        age:  req.body.age,
        height:  req.body.height,
        eyes_color: req.body.eyes_color,
        hair_color: req.body.hair_color,
        user_id: id
    });
    res.status(201).send(preference);
}))

// GET /api/preferencs/1  -- wyświetla preferencje danego usera, a nie id preferencji
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const preference = await Preference.query().select().where("user_id", id);
    if(!preference || preference == "") throw new UserNotFoundException();
    res.send(preference);
}))


router.put('/:id', asyncHandler(async (req, res) => {
    const user_id = req.params.id;
    const updatedPref = await Preference.query().patchAndFetchById(user_id, req.body).where('user_id', user_id);
    if(!updatedPref) throw new UserNotFoundException();
    res.send(updatedPref);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deletedCount = await Preference.query().deleteById(id).where("user_id", id);
    if(deletedCount === 0 ) throw new UserNotFoundException();
    res.status(204).end();
}))


module.exports = router;