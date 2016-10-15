//counter code

var button = document.getElementById('counter');

button.onclick = function(){
  //make a request to the counter endpoint
  var request = new XMLHttpRequest();
  
  //capture response and store it in a variable
  request.onreadystatechange = function(){
      if (request.readyState === XMLHttpRequest.DONE){
          if (request.status === 200){
              var counter = request.responseText;
              var span=document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
  };
  
  //render the value to the website
  request.open('GET','http://pinakinathc.imad.hasura-app.io/counter', true);
  request.send(null);
};

//Submit name

var nameInput = document.getElementById('name');
var name = nameInput.value ;
var submit = document.getElementById('submit_btn');

submit.onclick = function(){
//Make a request to the server and sent the name

//Capture a list of names and render it as a list
var names=['name1','name2','name3'];
var list = '';

for (var i=0;i< names.length;i++){
    list +='<li>' +names[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
    
};