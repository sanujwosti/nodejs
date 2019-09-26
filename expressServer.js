var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:root@cluster0-6hp2m.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/data', function(req, res){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cquProject");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("smartCamera").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  db.close();
});
});
});
app.listen(3000, () => console.log("listening on port 3000"))