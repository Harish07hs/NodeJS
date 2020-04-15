const express = require('express');
const app = express();
const port = 9000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "aprmrng";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Health Check')
});

//Get all users
app.get('/allUsers', (req, res) => {

    db.collection(col_name).find().toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
})

//Get active users
app.get('/activeUsers', (req, res) => {

    db.collection(col_name).find({IsActive: true}).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
})


app.get('/users/:id', (req, res) => {
    var { id } = req.params;
    console.log(id);

    var query = { Id: parseInt(id), IsActive: true }
    console.log(query);

    db.collection(col_name).find(query).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
})
app.get('/usersObjectId/:objid', (req, res) => {
    var { id } = req.params;
    console.log(id);

    var query = { _id: " ObjectId(" + id+  ")"}
    console.log(query);

    db.collection(col_name).find( {query}).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
})
//Insert
app.post('/addUser', (req, res) => {
    db.collection(col_name).insert(req.body, (err, result) => {
        if (err) {
            console.log("error section");
            throw err;
        } else {
            console.log("Saved");

            res.send('Data Added');
        }
    })
})

//Delete
app.delete('/deleteUser', (req, res) => {
    db.collection(col_name).findOneAndDelete({ "Id": parseInt(req.body.Id) },
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Data Deleted');
            }
        })
})
//DeactivateUser
app.delete('/deactivateUser', (req, res) => {
    db.collection(col_name)
        .findOneAndUpdate({ Id: parseInt(req.body.Id) }, {
            $set: {
                "Id": req.body.Id,
                "Name": req.body.Name,
                "Location": req.body.Location,
                "Contact": req.body.Contact,
                "IsActive": false
            }
        }, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('User Deactivated');
            }
        })
})

app.put('/updateUser', (req, res) => {
    db.collection(col_name)
        .findOneAndUpdate({ Id: parseInt(req.body.Id) }, {
            $set: {
                "Id": req.body.Id,
                "Name": req.body.Name,
                "Location": req.body.Location,
                "Contact": req.body.Contact,
                "IsActive": true
            }
        }, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Data Update');
            }
        })
})


MongoClient.connect(mongourl, (err, client) => {
    if (err) console.log('error while connecting');
    db = client.db('classdatabase');

    app.listen(port, (err) => {
        console.log(`App is running on port ${port}`)
    })

})