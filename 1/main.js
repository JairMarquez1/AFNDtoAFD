var entrada;
var contador= 0;
ebay = 0;
web = 0;
var longitud=0;

document.getElementById('inputfile').addEventListener('change', function() {    
    var fr=new FileReader();
    fr.onload=function(){
        document.getElementById('output').value=fr.result.toLowerCase();
    }  
    fr.readAsText(this.files[0]);
});

function calcular(){
	entrada = document.getElementById('output').value.toLowerCase();
	console.log(entrada);
	longitud = entrada.length;
    ebay = 0;
	web = 0;
	contador=0;
    uno(next());
}

function next(){
	if (longitud>contador) return entrada.charAt(contador++);
	else{
		document.getElementById('webQ').textContent=web;
		document.getElementById('ebayQ').textContent=ebay;
		return false;
	}
}


function uno(simbolo){
	if (!simbolo) return false;
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		default : uno(next());   break;
	}
}
function doce(simbolo){
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': _135(next());  break;
		default : uno(next());   break;
	}
}
function quince(simbolo){
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		case 'b': dieciseis(next());break;
		default : uno(next());   break;
	}
}
function _135(simbolo){
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		case 'b': _146(next());break;
		default : uno(next());   break;
	}
}
function dieciseis(simbolo){
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		case 'a': diecisiete(next());break;
		default : uno(next());   break;
	}

}
function _146(simbolo){
	web = web+1;
	console.log("web: "+web);
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		case 'a': diecisiete(next());break;
		default : uno(next());   break;
	}
}
function diecisiete(simbolo){
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		case 'y': dieciocho(next());break;
		default : uno(next());   break;
	}
}

function dieciocho(simbolo){
	ebay = ebay+1;
	console.log("ebay: "+ebay);
	//console.log(simbolo);
	switch (simbolo) {
		case 'w': doce(next());  break;
		case 'e': quince(next());break;
		default : uno(next());   break;
	}
}