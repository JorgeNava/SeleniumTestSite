const ServicesRequest = require('../models/ServicesRequestModel')
var mongoose = require('mongoose');


async function getOneById(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const service = await ServicesRequest.findById(id);
        return service.toJSON()
    }
    return "[ERROR] ServicesRequest - getOneById"
}

async function deleteOneById(id) {
    const service = await ServicesRequest.deleteOne({ _id: mongoose.Types.ObjectId(id) }, function (err) {
        if (err) return err
    });
    return service
}

async function getOneByInternalId(id) {
    const service = await ServicesRequest.findOne({ internalId: id });
    if (service) {
        return service.toJSON()
    } else {
        return {}
    }
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

async function saveOne(params) {
    const servicesRequest = new ServicesRequest(params)
    await servicesRequest.save();
}

async function updateOne(params) {
    await ServicesRequest.findOneAndUpdate({ internalId: params.internalId }, {status: params.status},{
        new: false
    })
}


module.exports = {
    getOneById,
    getAll,
    getManyByUsername,
    getOneByInternalId,
    deleteOneById,
    saveOne,
    updateOne
};