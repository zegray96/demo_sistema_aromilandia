$('#frmLogin').on('submit',function(e){
	e.preventDefault();
	var usuario = $('#usuario').val();
	var clave = $('#clave').val();
	if (usuario=="admin" && clave=="admin") {
		$(location).attr("href","vistas/dashboard");
	}else{
		Swal.fire({
			icon: 'error',
			title: '¡Usuario o Clave incorrectos!',
			allowOutsideClick: false
		});
	}
})

$('#btnCerrarSesion').click(function() {
  Swal.fire({
	  title: '¿Esta seguro de Cerrar Sesión?',
	  icon: 'question',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Aceptar',
	  cancelButtonText: 'Cancelar',
	  reverseButtons: true,
	  allowOutsideClick: false
	}).then((result) => {
		if (result.value) {
			$(location).attr("href","../index");
		}
	});
})