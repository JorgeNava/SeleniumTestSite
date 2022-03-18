const PaymentMethods = require('../models/PaymentMethodsModel')


async function getOneById(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const paymentMethod = await PaymentMethods.findById(id);
        return paymentMethod.toJSON()
    }
    return "[ERROR] PaymenthMethodService - getOneById"
}

async function getManyByOwnerUserId(ownerUserId) {
    const paymenthMethods = await PaymentMethods.find({ ownerUserId:  mongoose.Types.ObjectId(ownerUserId) });
    if (paymenthMethods) {
        return paymenthMethods.toJSON()
    } else {
        return "[ERROR] Paymenths Methods Service - getManyByOwnerUserId"
    }
}

async function getOneByMethodIdentifier(id) {
    const paymenthMethod = await PaymentMethods.findOne({ methodIdentifier:  mongoose.Types.ObjectId(id) });
    if (paymenthMethod) {
        return paymenthMethod.toJSON()
    } else {
        throw "Unexistant product"
    }
}

async function deleteOneById(id) {
    const paymehtMethod = await PaymentMethods.deleteOne({ _id: mongoose.Types.ObjectId(id) }, function (err) {
        if (err) return err
    });
    return paymehtMethod
}

async function saveOne(params) {
    if (getOneByMethodIdentifier(params.methodIdentifier) != "Unexistant product") {
        const paymehtMethod = new PaymentMethods(params)
        await paymehtMethod.save();
    } else {
        const paymehtMethod = PaymentMethods.updateOne({ methodIdentifier: params.methodIdentifier }, params, function (err, res) {
            return err
        });
        await product.toJson();
    }
}


module.exports = {
    getOneById,
    getManyByOwnerUserId,
    deleteOneById,
    getOneByMethodIdentifier,
    saveOne
};