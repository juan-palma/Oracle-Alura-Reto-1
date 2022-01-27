
/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/

//Codigo de Juan Palma
var control = {
	"encriptar!":{
		"busqueda":/a|e|i|o|u/gi,
		"valores":{
			"a":"ai",
			"e":"enter",
			"i":"imes",
			"o":"ober",
			"u":"ufat"
		}
	},
	"desencriptar!":{
		"busqueda":/ai|enter|imes|ober|ufat/gi,
		"valores":{
			"ai":"a",
			"enter":"e",
			"imes":"i",
			"ober":"o",
			"ufat":"u"
		}
	}
};

function aviso(m){
	alert(m);
}

function procesar(){
	var textoProcesado = input.value;
	var proceso = this.value;
	mensaje.value = textoProcesado.replace(control[proceso].busqueda, function(x){
		return control[proceso].valores[x];
	});
}

function copiar(){
	mensaje.select();
	document.execCommand("copy");
	aviso('Texto Copiado');
}

//Obtener elementos del html
var form = document.querySelector('form');
var input = form['input-texto'];
var btnEnc = form['btn-encriptar'];
var btnDes = form['btn-desencriptar'];
var mensaje = document.querySelector('#msg');
var btnCopy = document.querySelector('#btn-copy');

form.addEventListener('submit', function(e){ e.preventDefault(); });
btnEnc.addEventListener("click", procesar);
btnDes.addEventListener("click", procesar);
btnCopy.addEventListener("click", copiar);




