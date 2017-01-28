import History from '../models/history';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { HistoryDocument } from '../models/IHistory';
import db from '../connect';
(mongoose as any).Promise = bluebird;
// const mongoose = require('mongoose');
// const Promise = require('axios');
// import * as axios from 'axios';
// mongoose.Promise = Promise;

// 検索
export function find(req: express.Request, res: express.Response) {
    // var condition = {};
    History.find().exec((err, historyList) => {
        if (err) {
            console.log("historyController/find error");
            console.error(err);
            return res.status(500).send();
        }
        // console.log(historyList);
        return res.status(200).json({ historyList });
    });
}

// 追加
export function add(req: express.Request, res: express.Response) {
    var tmpInsertData: HistoryDocument = new History();
    tmpInsertData.from = req.body.fromAddress;
    tmpInsertData.to = req.body.toAddress;
    tmpInsertData.subject = req.body.subject;
    // console.log(tmpInsertData);
    tmpInsertData.save();
    // (mongoose as any).Promise = bluebird;
    // // tmpInsertData.markModified("History");

    // return bluebird.resolve(() => tmpInsertData.save())
    //     .then(() => {
    //         console.log("saved");
    //     }).catch(err => console.error(err));

    // return tmpInsertData.save((saveErr) => {
    //     if (saveErr) {
    //         console.log("historyController/add error");
    //         console.error(saveErr);
    //         return res.status(500).send();
    //     }
    //     console.log(tmpInsertData);
    //     return res.status(200).json({ insertData: tmpInsertData });
    // });
}

export default {
    find,
    add
};