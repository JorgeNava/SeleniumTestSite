const express = require('express')
const router = express.Router();
const productsService = require('../services/ProductsService.js')

router.get('/get-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    productsService.getOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

router.get('/get-one-by-internal-id/:internalId', (req, res, next) => {
    const INTERNAL_ID = req.params.internalId;
    productsService.getOneByInternalId(INTERNAL_ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

router.get('/get-many-by-filters/:type/:category', (req, res, next) => {
    const TYPE = req.params.type;
    const CATEGORY = req.params.category;
    productsService.getManyByFilters(TYPE,CATEGORY)
        .then(product => {
            res.json(product)
        }
        ).catch(err => {
        next(err)
    })
})

router.get('/get-many-by-type/', (req, res, next) => {
    const TYPE = req.query.type;
    productsService.getManyByType(TYPE)
        .then(product => {
            res.json(product)
        }
        ).catch(err => {
        next(err)
    })
})

router.get('/get-many-by-category', (req, res, next) => {
    const CATEGORY = req.body.category;
    productsService.getManyByCategory(CATEGORY)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})


router.post('/save-one', (req, res, next) => {
    productsService.saveOne(req.body).then(
        () => res.send('success')
    ).catch(err => {
        console.log("ERROR: ",err)
        next(err)
    })
})

router.delete('/delete-one-by-internal-id', (req, res, next) => {
    const INTERNAL_ID = req.body.internalId;
    productsService.deleteOneByInternalId(INTERNAL_ID).then(function(){
        res.status(201).send('Data deleted');
    }).catch(function(error){
        console.log("ERROR ",error);
        res.status(500).send('Data removal error');
    });
})

router.post('/delete-one-by-id', (req, res, next) => {
    const ID = req.body.id;
    productsService.deleteOneById(ID)
        .then(product => {
            res.json(product)
        }
    ).catch(err => {
        console.log('ERROR: ',err);
        next(err)
    })
})

module.exports = router;