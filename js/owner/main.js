/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
var idagl = {};
idagl.elementos = {};
var el = idagl.elementos;

// -- Opciones de control y valores para el sistema ---
var control = {
	"Encriptar":{
		"busqueda":/a|e|i|o|u/g,
		"valores":{ "a":"ai", "e":"enter", "i":"imes", "o":"ober", "u":"ufat" },
		"mensaje":"Se encripto su texto"
	},
	"Desencriptar":{
		"busqueda":/ai|enter|imes|ober|ufat/g,
		"valores":{ "ai":"a", "enter":"e", "imes":"i", "ober":"o", "ufat":"u" },
		"mensaje":"Se ha desencriptado su texto"
	},
	"validar":{
		"texto":/[^a-z\s]/g,
		"permitidos":/Backspace/
	},
	"mensajes":{
		"copiado":"Texto copiado en el portapapeles",
		"pegado":"Se envio el texto al encriptador",
		"soloMinusculas":"Introdusca solo minusculas",
		"incorrecto":"El texto no es valido",
		"vacio":"El campo esta vacío, introduce un texto a procesar",
		"limpio":"¡Limpio! :)"
	}
};


// ::::::::::::::::: Funciones :::::::::::::::::
//Aplicacion de la encriptacion/desencriptacion
function procesar(){
	if(!validar(el.input)){return false;}
	const proceso = this.value;
	control[proceso].animacion();
	el.salida.textContent = el.input.value.trim().replace(control[proceso].busqueda, function(x){
		return control[proceso].valores[x];
	});
	aviso(el.msgInput, control[proceso].mensaje, "cyan");
}
//Funcion de copia de texto
function copiar(){
	if(el.salida.textContent.trim() === ""){return false;}
	el.oculto.disabled = false;
	el.oculto.value = el.salida.textContent;
	el.oculto.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	el.salida.disabled = true;
	aviso(el.msgMas, control.mensajes.copiado);
}
function pegar(){
	if(el.salida.textContent.trim() === ""){return false;}
	el.input.value = el.salida.textContent;
	aviso(el.msgMas, control.mensajes.pegado);
}
function limpiar(){
	el.form.reset();
	el.salida.textContent = "";
	avisoClear(el.msgInput);
	avisoClear(el.msgMas);
	candadoClose();
	aviso(el.msgMas, control.mensajes.limpio);
}


// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar(){
	//Obtener elementos del html
	control["Encriptar"].animacion = candadoClose;
	control["Desencriptar"].animacion = candadoOpen;
	el.msgMas = document.getElementById('msgMas');
	el.msgInput = document.getElementById('msgInput');
	el.form = document.getElementById('formEnc');
	el.form.addEventListener('submit', function(e){ e.preventDefault(); });
	el.input = el.form['texto'];
	el.input.addEventListener('keydown', limitarEntrada);
	el.form['btnEncriptar'].addEventListener("click", procesar);
	el.form['btnDesencriptar'].addEventListener("click", procesar);
	el.salida = document.getElementById('salida');
	el.oculto = document.getElementById('respuestaH');
	el.oculto.disabled = true;
	document.getElementById('btnCopiar').addEventListener("click", copiar);
	document.getElementById('btnPegar').addEventListener("click", pegar);
	document.getElementById('btnClear').addEventListener("click", limpiar);
}


// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['validaciones', 'alertas', 'a/candado'], iniciar);








