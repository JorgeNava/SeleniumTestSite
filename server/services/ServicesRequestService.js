const ServicesRequest = require('../models/ServicesRequestModel')
var mongoose = require('mongoose');


async function getOneById(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const sale = await ServicesRequest.findById(id);
        return sale.toJSON()
    }
    return "[ERROR] ServicesRequest - getOneById"
}

async function deleteOneById(id) {
    const ServicesRequest = await ServicesRequest.deleteOne({ _id: mongoose.Types.ObjectId(id) }, function (err) {
        if (err) return err
    });
    return ServicesRequest
}

async function getManyByUsername(username) {
    const servicesRequests = await ServicesRequest.find({ username: username });
    if (servicesRequests) {
        return servicesRequests
    } else {
        return "[ERROR] ServicesRequest  - getManyByUsername"
    }
}

async function getAll() {
    const servicesRequests = await ServicesRequest.find({ });
    if (servicesRequests) {
        return servicesRequests
    } else {
        return "[ERROR] ServicesRequest  - getAll"
    }
}

async function getOneByInternalId(internalId) {
    const servicesRequest = await ServicesRequest.find({ internalId:  mongoose.Types.ObjectId(internalId) });
    if (servicesRequest) {
        return servicesRequest
    } else {
        return "[ERROR] ServicesRequest  - getOneByInternalId"
    }
}

async function saveOne(params) {
    const servicesRequest = new ServicesRequest(params)
    await servicesRequest.save();
}


module.exports = {
    getOneById,
    getAll,
    getManyByUsername,
    getOneByInternalId,
    deleteOneById,
    saveOne
};