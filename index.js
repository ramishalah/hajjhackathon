const express = require('express');
const PORT = process.env.PORT || 8888;
const bodyParser = require('body-parser');
const mysql = require('mysql');

// connecting to the clear db database
var con = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-iron-east-05.cleardb.net",
    user: "bd5e1294bfda78",
    password: "1ab708b1",
    database: "heroku_24f121bc0d498a9"
});


var app = express();
// to parse the request body
app.use(bodyParser.json());

// to  get all the faculty table
app.get('/faculty', function (req, res) {
    var sql = 'select * from faculty';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the admin table
app.get('/admin', function (req, res) {
    var sql = 'select * from admin';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the author table
app.get('/author', function (req, res) {
    var sql = 'select * from author';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the education table
app.get('/education', function (req, res) {
    var sql = 'select * from education';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});
// to  get all the membership table
app.get('/membership', function (req, res) {
    var sql = 'select * from membership';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the phone_number table
app.get('/phone_number', function (req, res) {
    var sql = 'select * from phone_number';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the publication table
app.get('/publication', function (req, res) {
    var sql = 'select * from publication';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the skill table
app.get('/skill', function (req, res) {
    var sql = 'select * from skill';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to  get all the work_experience table
app.get('/work_experience', function (req, res) {
    var sql = 'select * from work_experience';
    con.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send("An error happened in the server")
        } else {
            res.send(rows);
        }
    })
});

// to get the whole portfolio for a specific user
app.get('/portfolio/:id', function (req, res) {
    // var sql = `select fa.*, au.*, ed.*, mem.*, ph.*, pu.*, sk.*, wo.*
    // from faculty fa
    // join education ed
    // on fa.${req.params.id} = ed.${req.params.id}
    // join membership mem
    // on fa.${req.params.id} = mem.${req.params.id}
    // join phone_number
    // on fa.${req.params.id} = ph.${req.params.id}
    // join skill sk
    // on fa.${req.params.id} = sk.${req.params.id}
    // join work_experience wo
    // on fa.${req.params.id} = wo.${req.params.id}
    // join publication pu
    // on fa.${req.params.id} = pu.${req.params.id}
    // join author au
    // on pu.id_publication = au.id_publication`;

    con.query(sql, function (err, rows, fields) {
        if(err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    })
});


//
// .post('/addpreference', function(req, res, next){
//   var instructorId = req.body.InstructorID;
//   var courseCode = req.body.CourseCode;
//
//   var sql = `insert into preferences values('${courseCode}', ${instructorId}, 'inreview')`;
//   con.query(sql, function (err, rows, fields) {
//     if (err){
//       if(err.code == "ER_DUP_ENTRY")
//         res.status(400).send("Duplicate InstructorID and CourseCode");
//       else if(err.code == "ER_NO_REFERENCED_ROW_2")
//         res.status(400).send("InstructorID or course code does not exist");
//       else
//         res.status(400).send("JSON format is not correct");
//     } else {
//       res.send(req.body);
//     }
//
//   });
// })
//
// .put('/editpreference', function(req, res, next){
//   var instructorId = req.body.InstructorID;
//   var courseCode = req.body.CourseCode;
//   var status = req.body.Status;
//
//   var sql = `update preferences set Status = '${status}' where InstructorID = ${instructorId} AND CourseCode = '${courseCode}'`;
//   con.query(sql, function (err, rows, fields) {
//     if (err)
//       res.status(400).send("JSON format is not correct");
//     else
//       res.send(req.body);
//   });
// })
// // to delete all the preferences table
// .delete('/deletepreferences', function(req, res, next){
//
//   var sql = "TRUNCATE preferences";
//   con.query(sql, function (err, rows, fields) {
//     if (err) throw err;
//     res.send("Deleted!");
//   });
// })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
