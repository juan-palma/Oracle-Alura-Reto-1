
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



/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/

// -- Opciones de control y valores para el sistema ---
var control = {
	"encriptar!":{
		"busqueda":/a|e|i|o|u/g,
		"valores":{
			"a":"ai",
			"e":"enter",
			"i":"imes",
			"o":"ober",
			"u":"ufat"
		}
	},
	"desencriptar!":{
		"busqueda":/ai|enter|imes|ober|ufat/g,
		"valores":{
			"ai":"a",
			"enter":"e",
			"imes":"i",
			"ober":"o",
			"ufat":"u"
		}
	},
	"validar":{
		"texto":/[^a-z\s]/g,
		"permitidos":/Backspace/
	},
	"mensajes":{
		"encriptado":"Se encripto su texto",
		"desencriptado":"Se ha desencriptado su texto",
		"copiado":"Texto copiado",
		"pegado":"Se pego el valor",
		"incorrecto":"El texto no es valido"
	}
};



// -- Funciones --
//avisos del sistema
function aviso(m){
	alert(m);
}
//validaciones del texto
function limitarEntrada(e){
	console.log(e.key);
	var ctrlDown = e.ctrlKey||e.metaKey;
	if(ctrlDown && e.keyCode==86){ e.preventDefault(); e.stopPropagation(); return false; }
	if(!(ctrlDown && e.keyCode==67)){
		if(!control.validar.permitidos.test(e.key)){
			
			if(!control.validar.texto.test(e.key)){
				console.log('si');
			} else{
				e.preventDefault();
				e.stopPropagation();
			}
			setTimeout(function(){
				e.target.value = e.target.value.replace(control.validar.texto, "");
				e.target.value = e.target.value.replace(/\s{2,}/, " ");
			}, 2);
		}
	}
}
function validar(v){
	v.value = v.value.trim();
	if(control.validar.texto.test(v.value)){
		aviso(control.mensajes.incorrecto);
		return false;
	}
	return true;
}
//Aplicacion de la encriptacion/desencriptacion
function procesar(){
	if(!validar(input)){return false;}
	var proceso = this.value;
	mensaje.value = input.value.trim().replace(control[proceso].busqueda, function(x){
		return control[proceso].valores[x];
	});
}
//Funcion de copia de texto
function copiar(){
	mensaje.select();
	document.execCommand("copy");
	aviso(control.mensajes.copiado);
}


// -- Procesos --
//Obtener elementos del html
var form = document.querySelector('form');
var input = form['input-texto'];
var btnEnc = form['btn-encriptar'];
var btnDes = form['btn-desencriptar'];
var mensaje = document.getElementById('msg');
mensaje.disabled = true;
var btnCopy = document.getElementById('btn-copy');

//Activacion de eventos en los elementos.
form.addEventListener('submit', function(e){ e.preventDefault(); });
input.addEventListener('keydown', limitarEntrada);
btnEnc.addEventListener("click", procesar);
btnDes.addEventListener("click", procesar);
btnCopy.addEventListener("click", copiar);




