console.log('File getting changed');
var img = document.getElementById('madi');

var marginLeft = 0;

function moveRight() {
	marginLeft = marginLeft + 1;
	img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};

var counter = 0;

var button = document.getElementById('counter');

button.onclick = function(){
	counter = counter + 1;
	var select = document.getElementById('count');
	select.innerHTML = counter.toString();
};

var button1 = document.getElementById('counter1');

button1.onclick = function(){
	//create a request object
	var request = new XMLHttpRequest();

	//capture the request and store it in a variable
	request.onreadystatechange = function (){
		if (request.readyState === XMLHttpRequest.DONE){
			//taking action here
			if (request.status === 200){
				var counter1 = request.responseText;
				var span = document.getElementById('count1');
				span.innerHTML = counter1.toString();
			}
		}
		//Request not done yet
	};

	//make the request
	request.open('GET','http://pinakinathc.imad.hasura-app.io/counter',true);
	request.send(null);
};