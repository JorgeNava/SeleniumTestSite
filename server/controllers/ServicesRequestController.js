const express = require('express')
const router = express.Router();
const servicesRequestService = require('../services/ServicesRequestService.js')

router.get('/get-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    servicesRequestService.getOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

router.get('/get-many-by-username/:username', (req, res, next) => {
    const USERNAME = req.params.username;
    servicesRequestService.getManyByUsername(USERNAME)
        .then(requests => {
            res.json(requests)
        }
        ).catch(err => {
        next(err)
    })
})

router.get('/get-all', (req, res, next) => {
    servicesRequestService.getAll()
        .then(requests => {
            res.json(requests)
        }
        ).catch(err => {
        next(err)
    })
})

router.post('/save-one', (req, res, next) => {
    servicesRequestService.saveOne(req.body).then(
        () => res.send('success')
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})

router.post('/delete-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    servicesRequestService.deleteOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

module.exports = router;