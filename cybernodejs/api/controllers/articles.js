/**
 * Created by CHASE BROWN on 4/21/2017.
 */
module.exports = {
    getAll:getAll
};
var db = require('../../config/mdb');

function getAll(req,res,next) {
    var jvar = [];
    var key = '';
    var key1 = 0;
    var key2 = '';
    var key3 = '';
    var sdate = String(req.query.sdate);
    var edate = String(req.query.edate);
    var adate = String(req.query.adate);
    var zdate = String(req.query.zdate);
//searches only the title
    if (req.query.q === 'keywordtitle') {
        key = req.query.title;
        key1 = .25;
        key2 = req.query.author;
        if (req.query.sub === 'gt') {
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else if (req.query.sub === 'lt') {
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$lt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': 0},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        cursor.on('data', function (docs) {
            jvar.push(docs);
        });
        cursor.on('end', function () {
            res.send(jvar);
        });
    }

//searches both title and body
    else if (req.query.q === 'keywordtitlebody') {
        key = req.query.title;
        key1 = .25;
        key2 = req.query.author;
        key2 = key2.replace('+', ' ');
        key3 = req.query.body;
        key3 = key3.replace('+', ' ');
        if (req.query.sub === 'gt') {
            cursor = db.find({$and: [{$and:[{'author': new RegExp(key2,'i')},{'subjectivity': {'$gt':key1}},{'date': {'$gt': new Date(sdate),'$lt': new Date(edate)}}]},
                {$or: [{'title': new RegExp(key, 'i')}, {'body': new RegExp(key3, 'i')}]}]}).cursor();
        } else if (req.query.sub === 'lt') {
            cursor = db.find({$and: [{$and:[{'author': new RegExp(key2,'i')},{'subjectivity': {'$gt':key1}},{'date': {'$gt': new Date(sdate),'$lt': new Date(edate)}}]},
                {$or: [{'title': new RegExp(key, 'i')}, {'body': new RegExp(key3, 'i')}]}]}).cursor();
        } else
            cursor = db.find({$and: [{$and:[{'author': new RegExp(key2,'i')},{'subjectivity': {'$gt':0}},{'date': {'$gt': new Date(sdate),'$lt': new Date(edate)}}]},
                {$or: [{'title': new RegExp(key, 'i')}, {'body': new RegExp(key3, 'i')}]}]}).cursor();
        cursor.on('data', function (docs) {
            jvar.push(docs);
        });
        cursor.on('end', function () {
            res.send(jvar);
        });
    }

    //searches only by body
    else if (req.query.q === 'bodyonly') {
        key3 = req.query.body;
        key = req.query.title;
        key1 = .25;
        key2 = req.query.author;
        if (req.query.sub === 'gt') {
            cursor = db.find({
                'body': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else if (req.query.sub === 'lt') {
            cursor = db.find({
                'body': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$lt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else
            cursor = db.find({
                'body': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': 0},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        cursor.on('data', function (docs) {
            jvar.push(docs);
        });
        cursor.on('end', function () {
            res.send(jvar);
        });
    }
    //?q=uri&uripath='key'
    else if (req.query.q === 'uri') {
        key3 = req.query.uripath;
        key = req.query.title;
        key1 = .25;
        key2 = req.query.author;
        if (req.query.sub === 'gt') {
            cursor = db.find({
                'uri': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else if (req.query.sub === 'lt') {
            cursor = db.find({
                'uri': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$lt': key1},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        } else
            cursor = db.find({
                'uri': new RegExp(key3, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': 0},
                'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
            }).cursor();
        cursor.on('data', function (docs) {
            jvar.push(docs);
        });
        cursor.on('end', function () {
            res.send(jvar);
        });
    }

    //?q=date&sdate='string'&edate='string'
    else if (req.query.q === 'date') {
        key = req.query.title;
        key1 = .25;
        key2 = req.query.author;
        if (req.query.sub === 'gt') {
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': key1},
                'date': {'$gt': new Date(adate), '$lt': new Date(zdate)}
            }).cursor();
        } else if (req.query.sub === 'lt') {
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$lt': key1},
                'date': {'$gt': new Date(adate), '$lt': new Date(zdate)}
            }).cursor();
        } else
            cursor = db.find({
                'title': new RegExp(key, 'i'),
                'author': new RegExp(key2, 'i'),
                'subjectivity': {'$gt': 0},
                'date': {'$gt': new Date(adate), '$lt': new Date(zdate)}
            }).cursor();
        cursor.on('data', function (docs) {
            jvar.push(docs);
        });
        cursor.on('end', function () {
            res.send(jvar);
        });
    }
}
// function testing(req, res, next){
//     var jvar = [];
//     var searchword = 'microsoft+edge';
//     searchword = searchword.replace('+', ' ');
//     cursor = db.find({$and: [{$and:[{'author': new RegExp('brian','i')},{'subjectivity': {'$gt':0}},{'date': {'$gt': new Date('01/01/2000'),'$lt': new Date('04/01/2017')}}]},
//         {$or: [{'title': new RegExp(searchword, 'i')}, {'body': new RegExp(searchword, 'i')}]}]}).cursor();
//
//     cursor.on('data', function (docs) {
//         jvar.push(docs);
//     });
//     cursor.on('end', function () {
//         console.log(jvar);
//         console.log(jvar.length);
//     });
// }
// testing();
//getAll();
//     else if (req.query.q === 'keywordtitlebody') {
//         key = req.query.title;
//         key1 = .25;
//         key2 = req.query.author;
//         key3 = req.query.body;
//         if (req.query.sub === 'gt') {
//             cursor = db.find({
//                 'title': new RegExp(key, 'i'),
//                 'body': new RegExp(key3, 'i'),
//                 'author': new RegExp(key2, 'i'),
//                 'subjectivity': {'$gt': key1},
//                 'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
//             }).cursor();
//         } else if (req.query.sub === 'lt') {
//             cursor = db.find({
//                 'title': new RegExp(key, 'i'),
//                 'body': new RegExp(key3, 'i'),
//                 'author': new RegExp(key2, 'i'),
//                 'subjectivity': {'$lt': key1},
//                 'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
//             }).cursor();
//         } else
//             cursor = db.find({
//                 'title': new RegExp(key, 'i'),
//                 'body': new RegExp(key3, 'i'),
//                 'author': new RegExp(key2, 'i'),
//                 'subjectivity': {'$gt': 0},
//                 'date': {'$gt': new Date(sdate), '$lt': new Date(edate)}
//             }).cursor();
//         cursor.on('data', function (docs) {
//             jvar.push(docs);
//         });
//         cursor.on('end', function () {
//             res.send(jvar);
//         });
//     }
