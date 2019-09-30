var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:root@cluster0-6hp2m.mongodb.net/test?retryWrites=true&w=majority";



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.get('/data', (req, res) => res.send('Hello World!'))



app.get('/getdata', function(req, res, next){
	
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
	
	
	
	
    var resultArray = [];
	MongoClient.connect(url, function(err,db){
		

		
		var dbo = db.db('cquProject');
		dbo.collection("smartCamera").find({}, { projection: { _id: 0} }).toArray(function(err, result) {
    if (err) throw err;
	
	console.log(" document retrieved");
	resultArray.push(result[1].output);
	res.json(resultArray);	
			
    console.log(result[1].output);
    db.close();
	
	
	
  });
		
	/*	dbo.collection('smartCamera', function (err, collection){
			
			
			
			collection.find().toArray(function(err, items){
				
				if(err) throw err;
				console.log(items);
				resultArray.push(items);
			res.json(resultArray);	
			console.log(" document retrieved");
			});
			
			
		}); */
		
		//res.json(resultArray);
	});
	

});

app.post('/delete', function(req, res){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cquProject");
 
  dbo.collection("smartCamera").remove(req.body, function(err, res) {
    if (err) throw err;
    console.log("document deleted");
  db.close();
});
});
});



app.post('/data', function(req, res){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cquProject");
 
  dbo.collection("smartCamera").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  db.close();
});
});
});
app.listen(3000, () => console.log("listening on port 3000"))