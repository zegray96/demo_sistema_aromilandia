function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Mi Cuenta');
	$("#wrapper").show();
	$("#preload").hide();
}

//evitar que el enter haga el submit en los input text
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
	  if(e.keyCode == 13) {
	    e.preventDefault();
	  }
	}))

	document.querySelectorAll('input[type=number]').forEach( node => node.addEventListener('keypress', e => {
	  if(e.keyCode == 13) {
	    e.preventDefault();
	  }
	}))

	document.querySelectorAll('input[type=password]').forEach( node => node.addEventListener('keypress', e => {
	  if(e.keyCode == 13) {
	    e.preventDefault();
	  }
	}))
});
// fin enter verificacion

$('#btnCancelar').click(function() {
	$(location).attr("href","dashboard");
});

$('#btnCancelarModificarClave').click(function() {
	$('#modificarClave').modal('hide');
	$('#claveModificar').val("");
});

$("#form").on("submit", function(e){
	editar(e);
});

$("#formModificarClave").on("submit", function(e){
	modificar_clave(e);
});

// focus de elementos
$("#apellidoNombre").keypress(function(e) {
	if (event.key == "Enter"){
		$('#usuario').focus();
	}
});

$('#claveModificar').keypress(function(event) {
	if (event.key == "Enter"){
		$('#repetirClaveModificar').focus();
	}
});

$('#repetirClaveModificar').keypress(function(event) {
	if (event.key == "Enter"){
		$('#claveModificar').focus();
	}
});

// fin focus elementos

//colocar la primer letra de palabra en mayusuclas
function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

$('#apellidoNombre').blur(function() {
	$('#apellidoNombre').val(capitalizar($('#apellidoNombre').val()));
});


function editar(e){
	$('#cargandoModal').modal('show');

	e.preventDefault(); //no se activara la accion predeterminada del evento, osea del submit, se va hacer lo que yo le digo
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	Swal.fire({
		icon: 'success',
		title: '¡Guardado con exito!',
		allowOutsideClick: false
	});
	$('#spanApellidoNombreUsu').text($('#apellidoNombre').val());
}


function modificar_clave(e){
	$('#cargandoModal').modal('show');

	e.preventDefault(); //no se activara la accion predeterminada del evento, osea del submit, se va hacer lo que yo le digo
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	Swal.fire({
		icon: 'success',
		title: '¡Guardado con exito!',
		allowOutsideClick: false
	});
	$('#modificarClave').modal('hide');
	$('#claveModificar').val("");
	$('#repetirClaveModificar').val("");
}

// Al abrir modal
$('#modificarClave').on('shown.bs.modal', function () {
	$('#claveModificar').focus();
});

// al ocultar
$('#modificarClave').on('hidden.bs.modal', function (e) {
	$('#claveModificar').val("");
	$('#repetirClaveModificar').val("");
});


init();