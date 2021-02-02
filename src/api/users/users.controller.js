
const {Router} = require('express')
const User = require('../../models/user.model')
const Preference = require('../../models/preferences.model')
const asyncHandler = require("../async-handler");
const UserNotFoundException = require("../../exceptions/user-not-found.exception");
const AuthFailedException = require("../../exceptions/authentification-failed.exception");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const router = new Router();

// GET /api/users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.query();
    res.send(users);
}))

// GET /api/users/13
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.query().findById(id);
    if(!user) throw new UserNotFoundException();

    res.send(user);
}))


// PUT /api/users/13
router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedUser = await User.query().patchAndFetchById(id, req.body)
    if(!updatedUser) throw new UserNotFoundException();
    res.send(updatedUser);
}))


router.post('/login', asyncHandler(async (req, res,err) => {
    User.query().where( 'email', req.body.email )
        .then(user => {
            if (user.length < 1) {
                return err(new AuthFailedException());
            }
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) {
                    return err(new AuthFailedException());
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY || 'secret' ,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        //token: token
                    });
                }
                return err(new AuthFailedException());
            });
        })

}))

// DELETE /api/users/13
router.delete('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deletedCount = await User.query().deleteById(id);
    if(deletedCount === 0 ) throw new UserNotFoundException();
    res.status(204).end();
}))

router.post('/signup', asyncHandler(async (req, res) => {
    User.query().where('email', req.body.email)
        //.exec()
        .then(user => {
            if (user.length >= 1) {
                return  res.status(409).json({
                    message: 'Email exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }

                        else
                            {
                                const user = await User.query().insert({
                                    email: req.body.email,
                                    password: hash,
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    city: req.body.city,
                                    age: req.body.age,
                                    height: req.body.height,
                                    gender: req.body.gender,
                                    gender_interest: req.body.gender_interest,
                                    eyes_color: req.body.eyes_color,
                                    hair_color: req.body.hair_color
                                })
                    }
                })
                return  res.status(201).json({
                    message: 'User created'
                });
            }
        })
}))





module.exports = router;