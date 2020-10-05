const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Quotation = require('../models/quotation')

router.get('/', (req, res, next) => {
    Quotation.find()
        .then(docs => {
            console.log("docs", docs)
            if (docs.length > 0) {
                res.status(200).json(docs)
            } else {
                res.status(200).json({
                    message: 'No entries found'
                })
            }
        }).catch((err) => {
            console.log("err", err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    console.log("req", req)
    const quotation = new Quotation({
        _id: new mongoose.Types.ObjectId(),
        info: req.body.info,
        valid: req.body.valid
    })

    quotation.save().then((result) => {
        console.log("res", result)
        res.status(201).json({
            message: 'Post Request',
            quotation: quotation
        })

    }).catch((err) => {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    })
})

router.put('/', (req, res, next) => {
    console.log("req", req.body)
    Quotation.deleteOne({ _id: req.body.id })
        // .exec()
        .then(result => {
            console.log("result", result)
            res.status(200).json(result)
        }).catch((err) => {
            console.log("err", err)
            res.status(500).json({
                error: err
            })
        })

})


module.exports = router