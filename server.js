var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

counter =0;

app.get('/counter',function(req,res) {
    counter = counter+1;
    res.send(counter.toString());
});

app.get('/submit-name',function(req,res){
   //Get name from the request
   var name=req.query.name; //TODO
   //JSON
   names.push(JSON.stringify(name));
   
   res.send(names);
});


app.get('/article-one',function(req,res){
  res.send('Article 1 is requested and will be served');
});


app.get('/article-two',function(req,res){
  res.send('Article 2 is requested and will be served');
});


app.get('/article-three',function(req,res){
  res.send('Article 3 is requested and will be served');
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req,res){
  res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
names=[];

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
