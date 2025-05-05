const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path'); //importing the necessary dependencies

const app = express(); //creating the instance of express application which serve as the backbone of our server


app.use(express.static(path.join(__dirname,"public"))); // setup middleware functions to serve static files
app.use(cors()); //addressing security concerns by implementing cross origin resources sharing 'cors' to manage and control web security
app.use(express.json()); //parsing json data from incoming http  requests

const port = 5000; //configuration the application port

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
}); //establish connection to mysql database

app.post('/add_user',(req, res)=>{
    const sql = "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ]
    db.query(sql,values,(err,result)=>{
        if(err)
            return res.json({message: 'Something unexpected has occurred' + err});
        return res.json({success: "Student added successfully"});
    } );
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if(err) return res.json({message: "server error" });
        return res.json(result);
    })
});

app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_details WHERE `id`= ?";
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({message: "server error" });
        return res.json(result);
    })
});

app.listen(port, ()=>{
    console.log('listening')
}) //starting the server