var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
	user: 'pinakinathc',
	database: 'pinakinathc',
	host: 'db.imad.hasura-app.io',
	port: '5432',
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function(req,res){
	//make a select request

	//return a response with the results
	pool.query('SELECT * FROM test', function(err, result) {
		if (err) {
			res.status(500).send(err.toString());
		}
		else{
			res.send(JSON.stringify(result));
		}
	});
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (res,req) {
    res.sent("Article two requested and will be served");
});

app.get('/article-three', function (res,req) {
    res.sent("Article three requested and will be served");
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function(req,res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
})

var counter = 0;

app.get('/counter', function(req,res)  {
	counter = counter + 1;
	res.send(counter.toString());
});

app.get('/ui/resume.pdf', function(req,res){
	res.sendFile(path.join(__dirname, 'ui', 'resume.pdf'));
});

var names=[];
app.get('/submit-name', function(req,res){
	//Get the name from response
	var name = req.query.q;

	names.push(name);
	
	//now to sent this array or groups of object
	//we will need json
	//json is a way of converting javascript
	//objects into string
	
	res.send(JSON.stringify(names));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
