const express = require('express');
const PORT = process.env.PORT || 8888;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');


// connecting to the clear db database
var con = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "ba7173b462c95c",
    password: "143027ed",
    database: "heroku_2bbd7ece8c31b0e"
});


var app = express();

// to allow the cross origin thing.
app.use(cors());


// to parse the request body
app.use(bodyParser.json());


// set morgan to log info about our requests for development use.
app.use(morgan('dev'));




function arrangeMe() {

}


// to  get all the faculty table
app.get('/api/volunteer', function (req, res) {
            var sql = 'select * from volunteer';
            con.query(sql, function (err, rows, fields) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(rows);
                }
            });
});

// to get the a specific volunteer member
app.get('/api/volunteer/:volunteerId', function (req, res) {

    var sql = `select * from volunteer where idvolunteer = ${req.params.volunteerId}`;

    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows[0]);
        }
    });
});


app.get('/api/sectorsvolunteers', function (req, res) {

    var sectors = [];
    var volunteers = [];

    var sql = 'select * from sector';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            sectors = rows;


            // getting the volunteers table
            var sql = 'select * from volunteer';
            con.query(sql, function (err, rows, fields) {
                if(err) {
                    res.send(err);
                } else {
                    volunteers = rows;

                    var sectorsvolunteers = [];
                    // doing the the custom object
                    for(var i = 0; i < sectors.length; i++) {
                        for(var j = 0; j < volunteers.length; j++) {
                            if(sectors[i].idsector == volunteers[j].idsector) {
                                sectorsvolunteers.push(volunteers[j]);
                            }
                        }
                        sectors[i].volunteers = sectorsvolunteers;
                        sectorsvolunteers = [];
                    }

                    res.send(sectors);
                }
            })
        }
    });
});

app.put('/api/changestatus/:idvolunteer/:status', function (req, res) {
    var status = req.params.status;
    var sql;
    var table_data = {
        status: req.params.status
    };

    var sql = 'UPDATE volunteer SET ? WHERE idvolunteer = ?';


    con.query(sql, [table_data, req.params.idvolunteer], function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: "Successful"
            })
        }
    })
});

app.put('/api/editlocation/:idvolunteer/:lat/:lng', function (req, res) {
    var table_data = {
        lat: req.params.lat,
        lng: req.params.lng
    };

    var sql = 'UPDATE volunteer SET ? WHERE idvolunteer = ?';

    con.query(sql, [table_data, req.params.idvolunteer], function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: "Successful"
            })
        }
    })
});


app.put('/api/volunteerarrived', function (req, res) {


    var sql = 'update volunteer set idsector = 11 order by idvolunteer desc limit 1';

    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
            // var sql = 'insert into volunteer (`lat`, `lng`, `status`, `name`, `nationalid`, `category`, `idsector`) values (21.23423, 39.9433, "available", "yarob", 213213, "2", 11)'
            // con.query(sql, function (err, rows, fields) {
            //     if (err) {
            //         res.send(err);
            //     } else {
            //         res.send(rows);
            //     }
            // })
        }
    })
});




app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
