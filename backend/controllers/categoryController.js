const express = require('express');
const Router = express.Router();
const Categories = require('../models/Categories');

Router.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const checkCategory = await Categories.findOne({ name: name })
        if (checkCategory) {
            res.json({ status: 400, message: 'This category already exist' });
        } else {
            const categoryData = new Categories({
                name,
                description
            });

            await categoryData.save();
            res.json({ status: 200, message: 'Category added Successfully', data: categoryData });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred in insertion of category.' });
    }
};

Router.listOfCategories = async (req, res) => {
    try {
        res.json({ status: 200, data: await Categories.find() });
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.getCategory = async (req, res) => {
    try {
        // console.log("Category ID in get: ", req.params.id);
        const checkCategory = await Categories.findById(req.params.id);
        if (checkCategory) {
            res.json({ status: 200, message: "Update Successfully", data: checkCategory });
        } else {
            res.json({ status: 400, message: "Category not found" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.updateCategory = async (req, res) => {
    try {
        // console.log("Category ID: ", req.params.id);
        const checkCategory = await Categories.findById(req.params.id);
        if (checkCategory) {
            const checkAlreadyExistCategory = await Categories.find({ name: req.body.name });
            if (checkAlreadyExistCategory) {
                res.json({ status: 400, message: "This category already exist" });
            }
            else {
                const updateObject = {
                    name: req.body.name,
                    description: req.body.description
                };
                await Categories.findByIdAndUpdate({ _id: req.params.id }, { $set: updateObject });
                res.json({ status: 200, message: "Update Successfully" });
            }
        } else {
            res.json({ status: 400, message: "Category not found" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.deleteCategory = async (req, res) => {
    try {
        const checkCategory = await Categories.findById(req.params.id);
        if (checkCategory) {
            await Categories.findByIdAndRemove(req.params.id);
            res.json({ status: 200, message: "Delete Successfully" });
        } else {
            res.json({ status: 400, message: "Category not found" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

// Router.get = async (req, res) => {
//     try {
//         res.status(200).json({ result: await customer.find() });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving the records.' });
//     }
// };

// Router.get = async (req, res) => {
//     try {
//         const getCustomer = await customer.findOne({ _id: req.params.id });

//         if (!getCustomer) {
//             return res.send('Customer not found');
//         }

//         await customer.findOneAndRemove({ _id: req.params.id });
//         res.status(200).json("Deleted");
//     } catch (error) {
//         res.status(500).json("Customer not Delete");
//     }
// };

module.exports = Router;
