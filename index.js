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



// app.post('/api/login', (req, res) => {
//     // Mock user (request with data base and then you get the user back)
//     const user = {
//         id: 1,
//         username: "rami",
//         email: "rami@gmail.com"
//     };
//    jwt.sign({user:user}, 'helloworld', function (err, token) {
//        res.json({
//            token: token
//        })
//    });
// });




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
                    }

                    res.send(sectors);
                }
            })
        }
    });



})


// // to  get all the admin table
// app.get('/admin', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from admin';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//
// // to  get all the author table
// app.get('/author', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from author';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // to  get all the education table
// app.get('/education', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from education';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
// // to  get all the membership table
// app.get('/membership', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from membership';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // to  get all the phone_number table
// app.get('/phone_number', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from phone_number';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
// });
//
// // to  get all the publication table
// app.get('/publication', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from publication';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//
// // to  get all the skill table
// app.get('/skill', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from skill';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//
// // to  get all the work_experience table
// app.get('/work_experience', verifyToken, function (req, res) {
//
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'select * from work_experience';
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//

//
// // to get the a specific education.
// app.get('/education/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from education where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // to get the a specific membership.
// app.get('/membership/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from membership where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//
//
// // to get the a specific phone numbers.
// app.get('/phoneNumber/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from phone_number where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
// });
//
// // to get the a specific publication.
// app.get('/publication/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var sql = `select * from publication where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
//
// });
//
// // to get the a specific skill.
// app.get('/skill/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from skill where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // to get the a specific work_experience.
// app.get('/workExperience/:facultyId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from work_experience where id_faculty = ${req.params.facultyId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // to get the a specific authors.
// app.get('/author/:publicationId', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = `select * from author where id_publication = ${req.params.publicationId}`;
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//         }
//     });
//
// });
//
// // To search for a faculty by last name
// app.get('/searchByFacultyLastName/:lastName', function (req, res) {
//     var sql = "select * from `faculty` f where `f`.`last_name` = " + "\'" + req.params.lastName + "\'" + " AND `f`.`approved` = 1";
//
//     con.query(sql, function (err, rows, fields) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(rows);
//         }
//     })
//
// });
//
// // To approve a specific faculty
// app.put('/approveFaculty', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'UPDATE `faculty` SET `approved` = 1 WHERE `id_faculty` = ?';
//
//             con.query(sql, [req.body.id_faculty], function (err, rows, fields) {
//                 if (parseInt(rows.affectedRows) == 0) {
//                     res.status(400).send("Id not found");
//                 } else {
//                     res.send("Successful");
//                 }
//             })
//         }
//     });
//
// });
//
// // To approve a specific faculty
// app.put('/disapproveFaculty', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var sql = 'UPDATE `faculty` SET `approved` = 0 WHERE `id_faculty` = ?';
//
//             con.query(sql, [req.body.id_faculty], function (err, rows, fields) {
//                 if (parseInt(rows.affectedRows) == 0) {
//                     res.status(400).send("Id not found");
//                 } else {
//                     res.send("Successful");
//                 }
//             })
//         }
//     });
//
// });
//
// // To get all the appending faculty
// app.get('/appendingPortfolio', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'SELECT * from faculty WHERE approved = 0';
//
//             con.query(sql, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send(rows);
//                 }
//             })
//
//
//         }
//     });
// });
//
// // To add a membership for a specific faculty
// app.post('/addMembership', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 position: req.body.position,
//                 url: req.body.url,
//                 name: req.body.name,
//                 expire_date: req.body.expire_date,
//                 id_faculty: data.data
//             };
//
//
//             var sql = 'INSERT INTO membership SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a membership
// app.put('/editMembership', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 position: req.body.position,
//                 url: req.body.url,
//                 name: req.body.name,
//                 expire_date: req.body.expire_date,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE membership SET ? WHERE id_membership = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_membership, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete a membership
// app.delete('/deleteMembership', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM membership WHERE id_membership = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_membership, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
//
// // To add a phone number for a specific faculty
// app.post('/addPhonenumber', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 number: req.body.number,
//                 id_faculty: data.data
//             };
//
//
//             var sql = 'INSERT INTO phone_number SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a phone number
// app.put('/editPhonenumber', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 number: req.body.number,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE phone_number SET ? WHERE id_phone_number = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_phone_number, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete a phone number
// app.delete('/deletePhoneNumber', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM phone_number WHERE id_phone_number = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_phone_number, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
//
// // To add an author for a specific publication
// app.post('/addAuthor', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 id_publication: req.body.id_publication
//             };
//
//
//             var sql = 'INSERT INTO author SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit an author
// app.put('/editAuthor', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE author SET ? WHERE id_author = ? AND id_publication = ?';
//
//             con.query(sql, [table_data, req.body.id_author, req.body.id_publication], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete an author
// app.delete('/deleteAuthor', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM author WHERE id_author = ? AND id_publication = ?';
//
//             con.query(sql, [req.body.id_author, req.body.id_publication], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // To add a publication for a specific faculty
// app.post('/addPublication', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 date: req.body.date,
//                 abstract: req.body.abstract,
//                 title: req.body.title,
//                 url: req.body.url,
//                 issn: req.body.issn,
//                 number_of_pages: req.body.number_of_pages,
//                 id_faculty: data.data
//             };
//
//
//             var sql = 'INSERT INTO publication SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a publication
// app.put('/editPublication', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 date: req.body.date,
//                 abstract: req.body.abstract,
//                 title: req.body.title,
//                 url: req.body.url,
//                 issn: req.body.issn,
//                 number_of_pages: req.body.number_of_pages,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE publication SET ? WHERE id_publication = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_publication, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete a publication
// app.delete('/deletePublication', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM publication WHERE id_publication = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_publication, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // To add a work_experience for a specific faculty
// app.post('/addWorkExperience', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 description: req.body.description,
//                 start_date: req.body.start_date,
//                 end_date: req.body.end_date,
//                 position: req.body.position,
//                 company_name: req.body.company_name,
//                 id_faculty: data.data
//             };
//
//
//             var sql = 'INSERT INTO work_experience SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a work experience
// app.put('/editWorkExperience', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 description: req.body.description,
//                 start_date: req.body.start_date,
//                 end_date: req.body.end_date,
//                 position: req.body.position,
//                 company_name: req.body.company_name,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE work_experience SET ? WHERE id_work_experience = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_work_experience, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete a work experience
// app.delete('/deleteWorkExperience', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM work_experience WHERE id_work_experience = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_work_experience, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // To add a skill for a specific faculty
// app.post('/addSkill', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 name: req.body.name,
//                 id_faculty: data.data
//             };
//             var sql = 'INSERT INTO skill SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a skill
// app.put('/editSkill', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 name: req.body.name,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE skill SET ? WHERE id_skill = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_skill, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete a skill
// app.delete('/deleteSkill', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM skill WHERE id_skill = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_skill, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // To add an education for a specific faculty
// app.post('/addEducation', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var table_data = {
//                 description: req.body.description,
//                 start_date: req.body.start_date,
//                 end_date: req.body.end_date,
//                 specialization: req.body.specialization,
//                 university: req.body.university,
//                 id_faculty: data.data
//             };
//             var sql = 'INSERT INTO education SET ?';
//
//             con.query(sql, table_data, function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//
//
//         }
//     });
// });
//
// // to edit a skill
// app.put('/editEducation', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 description: req.body.description,
//                 start_date: req.body.start_date,
//                 end_date: req.body.end_date,
//                 specialization: req.body.specialization,
//                 university: req.body.university,
//                 is_visible: req.body.is_visible
//             };
//
//             var sql = 'UPDATE education SET ? WHERE id_education = ? AND id_faculty = ?';
//
//             con.query(sql, [table_data, req.body.id_education, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to delete an education
// app.delete('/deleteEducation', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             var sql = 'DELETE FROM education WHERE id_education = ? AND id_faculty = ?';
//
//             con.query(sql, [req.body.id_education, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
// // to edit a faculty
// app.put('/editFaculty', verifyToken, function (req, res) {
//     jwt.verify(req.token, 'helloworld', function (err, data) {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//
//             var table_data = {
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 short_biography: req.body.short_biography,
//                 office_location: req.body.office_location,
//                 email: req.body.email,
//                 department: req.body.department,
//                 website_url: req.body.website_url,
//                 is_first_name_visible: req.body.is_first_name_visible,
//                 is_last_name_visible: req.body.is_last_name_visible,
//                 is_short_biography_visible: req.body.is_short_biography_visible,
//                 is_office_location_visible: req.body.is_office_location_visible,
//                 is_email_visible: req.body.is_email_visible,
//                 is_department_visible: req.body.is_department_visible,
//                 is_website_url_visible: req.body.is_website_url_visible,
//                 is_photo_visible: req.body.is_photo_visible
//             };
//
//             var sql = 'UPDATE faculty SET ? WHERE id_faculty = ?';
//
//             con.query(sql, [table_data, data.data], function (err, rows, fields) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.json({
//                         message: "Successful"
//                     })
//                 }
//             })
//         }
//     });
// });
//
//
// // For Sign up
// app.post('/signup', function (req, res) {
//
//     var table_data = {
//         first_name: req.body.firstName,
//         last_name: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password
//     };
//
//     var sql = 'INSERT INTO faculty SET ?';
//
//     con.query(sql, table_data, function (err, rows, fields) {
//         if (err) {
//             res.send(err);
//         } else {
//             var id = rows.insertId;
//             jwt.sign({data: id}, 'helloworld', function (err, token) {
//                 res.json({
//                     token: token,
//                     id_faculty: id
//                 })
//             });
//         }
//     })
// });
//
// // For sign in
// app.post('/signin', function (req, res) {
//
//     var sql = 'SELECT * FROM faculty where email = ?';
//
//     con.query(sql, [req.body.email], function (err, rows, fields) {
//         if (err) {
//             res.send(err);
//         } else {
//
//             if (rows.length > 0) {
//                 if (req.body.password == rows[0].password) {
//                     jwt.sign({data: rows[0].id_faculty}, 'helloworld', function (err, token) {
//                         res.json({
//                             token: token,
//                             id_faculty: rows[0].id_faculty
//                         })
//                     });
//                 } else {
//                     res.status(400).send("Incorrect password");
//                 }
//             } else {
//                 console.log(rows);
//                 res.status(400).send("Email does not exists");
//             }
//         }
//     })
//
// });


// app.post('/signup', function (req, res) {
//    var firstName = req.body.firstName;
//    var lastName = req.body.lastName;
//    var email = req.body.email;
//    var password = req.body.password;
//
//
//    var sql = "insert into `faculty` (`first_name`, `last_name`, `email`, `password`) values(" + "\'" +firstName + "\'" + "," + "\'" +  lastName + "\'" + "," + "\'" + email + "\'" + "," + "\'" + password + "\'"  + ")";
//
//    con.query(sql, function (err, rows, fields) {
//        if(err) {
//            res.send(err);
//        } else {
//            var id = rows.insertId;
//            res.send(`${id}`);
//        }
//    })
// });

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
