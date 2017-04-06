const Promise = require("bluebird");
const express = require("express");
const pgp = require("pg-promise")({
  promiseLib: Promise
})
const config = require('./config');
const bodyParser = require('body-parser');
const db = pgp(config);
const app = express();


app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", function(req, res){
  res.render("home.hbs", {
    title: "RSVP"
  })
})

app.post("/submit", function(req, res){
  name=req.body.name;
  togo=req.body.togo;
  number_of_people=req.body.number_of_people;
  db.none(`insert into rsvp values (default, $1, $2, $3)`, [name, togo, number_of_people])
    .then(function(){
      res.render("submit.hbs", {
        title: "RSVP"
      })
    })
})

app.listen(3003, function(){
  console.log("listening to 3003...")
})
