var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
	user: 'pinakinathc',
	database: 'pinakinathc',
	host: 'db.imad.hasura-app.io',
	port: '5432',
	password: 'db-pinakinathc-68397'// please use some environment variables here instead of using the password here dure to security reasons. I have added this password here as there is not much security resason. Please do not affect the database using these crediantials.
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
			res.send(JSON.stringify(result.rows));
		}
	});
});

var counter = 0;

app.get('/counter', function(req,res)  {
	counter = counter + 1;
	res.send(counter.toString());
});


app.get('/ui/main.js', function(req,res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
})



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


var articles = {
	'article-one':{
		title: 'Article One | Pinaki Nath Chowdhury',
		heading: 'Article One',
		date: 'Sep 5, 2016',
		content: `<p>This is the centent of the first article</p>`
	},

	'article-two':{
		title: 'Article Two | Pinaki Nath Chowdhury',
		heading: 'Article Two',
		date: 'Sep 10, 2016',
		content: `<p>This is the centent of the second article</p>`
	},

	'article-three':{
		title: 'Article Three | Pinaki Nath Chowdhury',
		heading: 'Article Three',
		date: 'Sep 15, 2016',
		content: `<p>This is the centent of the third article</p>`
	}

	
}
function createTemplate (data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;

	var htmlTemplate = `
		<html>
			<head>
				<title>
					%{title}
				</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="/ui/style.css" rel="stylesheet" />
			</head>

			<body>
				<div class="container">
					<div>
						<a href="/">Home</a>
					</div>
					<hr/>
					<h3>
						${heading}
					</h3>
					<div>
						${date}
					</div>
					<div>
						${content}
					</div>
				</div>
			</body>
		</html>
	`;

	return htmlTemplate;
}
/*
app.get('/article-one', function (req, res) {
  res.send(createTemplate(articles['article-one']));
});
app.get('/article-two', function (req,res) {
  res.send(createTemplate(articles['article-two']));
});

app.get('/article-three', function (req, res) {
  res.send(createTemplate(articles['article-three']));
});
*/

app.get('/:articleName', function(req, res) {
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
