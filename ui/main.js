//counter code

var button = document.getElementById('submit');

button.onclick = function(){
  //make a request to the counter endpoint
  var request = new XMLHttpRequest();
  
  //capture response and store it in a variable
  request.onreadystatechange = function(){
      if (request.readyState === XMLHttpRequest.DONE){
          if (request.status === 200){
      var names=request.responseText;
      names=JSON.parse(names);
var list = '';

for (var i=0;i< names.length;i++){
    list +='<li>' +names[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
    }
      }
  };
  
  //render the value to the website
  request.open('GET','http://pinakinathc.imad.hasura-app.io/submit-name?name=', true);
  request.send(null);
};

//Submit name

var nameInput = document.getElementById('name');
var name = nameInput.value ;
var submit = document.getElementById('submit_btn');
