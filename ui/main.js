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