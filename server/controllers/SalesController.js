const express = require('express')
const router = express.Router();
const salesService = require('../services/SalesService.js')

router.get('/get-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    salesService.getOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

router.get('/get-many-by-buyer-id/:buyerUsername', (req, res, next) => {
    const BUYER_USERNAME = req.params.buyerUsername;
    salesService.getManyByBuyerId(BUYER_USERNAME)
        .then(sales => {
            res.json(sales)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})


router.post('/save-one', (req, res, next) => {
    salesService.saveOne(req.body).then(
        () => res.send('success')
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})

router.post('/delete-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    salesService.deleteOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

module.exports = router;