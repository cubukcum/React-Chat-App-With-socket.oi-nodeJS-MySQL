const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const http = require("http")

const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "mehmet",
  host: "192.168.64.2",
  password: "mehmet",
  database: "messenger",
});

//NEW USER REGISTER
app.post("/create", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = hash;
    const phone = req.body.phone;

    db.query(
      "INSERT INTO users (id,username,fname,lname,email,password,phone) VALUES (?,?,?,?,?,?,?)",
      [null, username, fname, lname, email, password, phone],
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.json("User Registered");
        }
      }
    );
  })
});

//EXISTING USER LOGIN
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username)
  db.query(
    "SELECT * FROM users WHERE username = ? ",
    [username],
    (err, result) => {
      if (err) res.status(400).json({ error: "User Doesnt Exist" });
      console.log(result)
      const dbPassword = result[0].password

      bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
          res.status(400).json({ error: "Wrong Username and Password Combination!" });
        } else {
          res.status(200).json({ message: "Logged In", userId: result[0].id })
        }
      })

    }
  );
});

//Save message to database
app.post("/sendmessage", (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const text = req.body.text;
  db.query(
    "INSERT INTO messages (id, sender, receiver, text) VALUES (?,?,?,?)",
    [null, sender, receiver, text],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Message Sent");
      }
    }
  );
});


app.get("/people", (req, res) => {
  db.query("select username,email,id,fname,lname from users", function (err, result) {
    if (err) {
      console.log(err)
    }

    else {
      res.status(200).json(result)
    }
  });

});

app.post("/getmessages", (req, res) => {

const sender = req.body.sender;
const receiver = req.body.receiver;
console.log(sender);
console.log(receiver)
  db.query("select * from messages WHERE(sender = ? OR sender = ?) AND ( receiver = ? OR receiver = ?)",
  [sender, receiver, sender, receiver], 
  (err, result) => {
    if (err) {
      console.log("hata")
    }

    else {
      console.log(result)
      res.status(200).json(result);
    }
  });

});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});