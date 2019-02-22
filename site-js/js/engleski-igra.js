
document.getElementById('form1').onsubmit=function(){
	color = parseInt(document.querySelector('input[name = "color"]:checked').value);
	car = parseInt(document.querySelector('input[name = "car"]:checked').value);
	house = parseInt(document.querySelector('input[name ="house"]:checked').value);
	tree = parseInt(document.querySelector('input[name = "tree"]:checked').value);

	result = color + car + house + tree;

	document.getElementById('grade1').innerHTML = result;

	return false;
};