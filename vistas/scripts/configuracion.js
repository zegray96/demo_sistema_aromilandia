function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Configuración');
	$("#wrapper").show();
	$("#preload").hide();
	mostrar();
}

$('#btnCancelar').click(function() {
	$(location).attr("href","dashboard");
});


$("#form").on("submit", function(e){
	editar(e);
});


//colocar la primer letra de palabra en mayusuclas
function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

$('#nombreEmpresa').blur(function() {
	$('#nombreEmpresa').val(capitalizar($('#nombreEmpresa').val()));
});


function validar_mostrar_logo(input) {
	var archivo = $("#logoEmpresa").val();
	var extensiones = archivo.substring(archivo.lastIndexOf("."));
	if(extensiones != ".png"){
		Swal.fire({
			icon: 'error',
			title: "El archivo de tipo " + extensiones + " no es válido",
		});
		$("#logoEmpresa").val(null);
	}else{
		var reader = new FileReader();
	    reader.onload = function(e) {
	      // Asignamos el atributo src a la tag de imagen
	      $('#logoEmpresaImg').attr('src', e.target.result);
	    }
	    reader.readAsDataURL(input.files[0]);
	}
}


$('#logoEmpresa').on('change', function() {
	validar_mostrar_logo(this);
});



function mostrar(){
	$('#cargandoModal').modal('show');
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	$('#nombreEmpresa').val('Aromilandia');
	$('#logoEmpresaImg').attr("src","../assets/img/logo-empresa.png"+"?"+Math.random());
}

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
	mostrar();
	$('#nombreEmpresaHeader').text($('#nombreEmpresa').val());
	$('#logoEmpresa').val(null);
}






init();