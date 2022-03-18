const Products = require('../models/ProductsModel')
var isEmpty = require('lodash.isempty');

async function getOneById(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const product = await Products.findById(mongoose.Types.ObjectId(id));
        return product.toJSON()
    }
    return "[ERROR] ProductsService - getById"
}

async function getOneByInternalId(id) {
    const product = await Products.findOne({ internalId: id });
    if (product) {
        return product.toJSON()
    } else {
        return {}
    }
}

async function getManyByFilters(type, category) {
    let products = null;
    if (type != "None" && category != "None") {
        products = await Products.find({ type: type, category: category });
    } else if (type != "None" && category == "None") {
        products = await Products.find({ type: type });
    } else if (type == "None" && category != "None") {
        products = await Products.find({ category: category });
    } else if (type == "None" && category == "None") {
        products = await Products.find({});
    } else {
        products = "None";
    }
    return products
}

async function getManyByType(typeName) {
    const products = await Products.find({ type: typeName });
    if (products) {
        return products
    } else {
        return {}
    }
}

async function getManyByCategory(category) {
    const products = await Products.find({ category: category });
    if (products) {
        return products
    } else {
        return {}
    }
}

async function deleteOneByInternalId(id) {
    await Products.deleteOne({ internalId: id }, function (err) {
        if (err) return err
        return "Data deleted"
    }).clone();
}

async function deleteOneById(id) {
    const product = await Products.deleteOne({ _id: mongoose.Types.ObjectId(id) }, function (err) {
        if (err) return err
    });
    return product
}

async function saveOne(params) {
    const productExist = await getOneByInternalId(params.internalId);
    if(isEmpty(productExist)) {
        const product = new Products(params)
        await product.save();
    } else {
        Products.updateOne({internalId: params.internalId}, params, function (err, docs) {
            if (err){
                console.error("[ERROR] ProductsService - saveOne",err)
            }
        });
    }
    return await getOneByInternalId(params.internalId)
}


module.exports = {
    getOneById,
    getOneByInternalId,
    getManyByFilters,
    getManyByType,
    getManyByCategory,
    deleteOneByInternalId,
    deleteOneById,
    saveOne
};