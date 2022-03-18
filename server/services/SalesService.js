const Sales = require('../models/SalesModel')
var mongoose = require('mongoose');


async function getOneById(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const sale = await Sales.findById(id);
        return sale.toJSON()
    }
    return "[ERROR] SalesService - getOneById"
}

async function deleteOneById(id) {
    const sales = await Sales.deleteOne({ _id: mongoose.Types.ObjectId(id) }, function (err) {
        if (err) return err
    });
    return sales
}

async function getManyByBuyerId(buyerUsername) {
    const sales = await Sales.find({ buyerUsername: buyerUsername }).sort({date: -1});
    if (sales) {
        return sales
    } else {
        return "[ERROR] SalesService  - getManyByBuyerId"
    }
}

async function getManyByPaymentMethodId(paymentMethodId) {
    const sales = await Sales.find({ paymentMethodId:  mongoose.Types.ObjectId(paymentMethodId) });
    if (sales) {
        return sales.toJSON()
    } else {
        return "[ERROR] SalesService  - getManyByPaymentMethodId"
    }
}

async function getOneByInternalId(internalId) {
    const sale = await Sales.find({ internalId:  mongoose.Types.ObjectId(internalId) });
    if (sale) {
        return sale
    } else {
        return "[ERROR] SalesService  - getOneByInternalId"
    }
}

async function saveOne(params) {
    const sale = new Sales(params)
    await sale.save();
}


module.exports = {
    getOneById,
    getManyByBuyerId,
    getManyByPaymentMethodId,
    getOneByInternalId,
    deleteOneById,
    saveOne
};