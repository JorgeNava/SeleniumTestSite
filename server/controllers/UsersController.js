const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const usersService = require('../services/UsersService.js')

router.post('/register', (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    usersService.register(req.body).then(
        () => res.send('success')
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})

router.post('/login', (req, res, next) => {
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    usersService.login(USERNAME, PASSWORD)
        .then(user => {
            res.json(user)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

router.get('/email/:email', (req, res, next) => {
    usersService.getOneByEmail(req.params.email).then(
        (user) => res.json(user)
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})

router.get('/id/:id', (req, res, next) => {
    usersService.getOneById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})



module.exports = router;