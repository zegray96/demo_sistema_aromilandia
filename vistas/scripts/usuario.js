var tabla;
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Usuarios');
	listar();
	mostrar_form(false);
	$("#wrapper").show();
	$("#preload").hide();
}

// ajustamos las columnas de tabla
$('#sidebarToggleTop').click(function(e){
    setTimeout(function(){
        tabla.columns.adjust();
    },300);
});

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

// focus de elementos
$("#apellidoNombre").keypress(function(e) {
	if (event.key == "Enter"){
		$('#usuario').focus();
	}
});

$('#usuario').keypress(function(event) {
	if (event.key == "Enter"){
		$('#clave').focus();
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

$('#btnNuevo').click(function() {
	mostrar_form(true);
	$('#apellidoNombre').focus();
});

$('#btnCancelar').click(function() {
	mostrar_form(false);
	tabla.columns.adjust();
});

$("#form").on("submit", function(e){
	nuevo_editar(e);
});

$('#btnCancelarModificarClave').click(function() {
	$('#modificarClave').modal('hide');
	$('#claveModificar').val("");
});

$("#formModificarClave").on("submit", function(e){
	modificar_clave(e);
});

// Al abrir modal
$('#modificarClave').on('shown.bs.modal', function () {
	$('#claveModificar').focus();
});

// al ocultar
$('#modificarClave').on('hidden.bs.modal', function (e) {
	$('#claveModificar').val("");
	$('#repetirClaveModificar').val("");
});


function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

$('#apellidoNombre').blur(function() {
	$('#apellidoNombre').val(capitalizar($('#apellidoNombre').val()));
});


function listar(){
	tabla=$('#tblListado').dataTable({
    	//utilizar en caso de que no haya server side
		"aProccessing": true, //Activamos el procesamiento de datatables
		"aServerSide": true, //Paginacion y filtrado relizados por el servidor
		//
		"searching": true, //no me muestra el boton buscar
        "language":{
        		"url": "../assets/json/Spanish.json"
        },
        "scrollY": '48vh', //tamaño de barra de desplazamiento
		"scrollX": true, //muestra el scroll x
        "lengthMenu": [[25, 100, 1000], [25, 100, 1000]],
		dom: 'Bflrtip', //definimos los elementos del control de la tabla
		buttons:[
			{
				extend: 'excelHtml5',
				exportOptions: {
					columns: [1,2,3,4,5]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



		],

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[2,"asc"]] //para ordenar los registros
    }).DataTable();
}


function mostrar_form(mostrar){
	limpiar();
	if(mostrar){
		$('#listado').hide();
		$('#formulario').show();
		$('#contenedor-cabecera').css("cssText", "display:none !important");
		$('#btnNuevo').css("cssText", "display:none !important");
		$('#clave').prop('readonly',false);
		$('#linkModificarClave').hide();
	}else{
		$('#listado').show();
		$('#formulario').hide();
		$('#contenedor-cabecera').css("cssText", "display:block !important");
		$('#btnNuevo').css("cssText", "display:block !important");
	}
}

function nuevo_editar(e){
	$('#cargandoModal').modal('show');

	e.preventDefault(); //no se activara la accion predeterminada del evento, osea del submit, se va hacer lo que yo le digo
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	Swal.fire({
		icon: 'success',
		title: '¡Guardado con exito!',
		allowOutsideClick: false
	}).then(function() {
		$('#apellidoNombre').focus();
	});
	$('#clave').prop('readonly',false);
	$('#linkModificarClave').hide();
	limpiar();
}


function modificar_clave(e){
	$('#cargandoModal').modal('show');

	e.preventDefault(); //no se activara la accion predeterminada del evento, osea del submit, se va hacer lo que yo le digo
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	Swal.fire({
		icon: 'success',
		title: '¡Clave modificada con exito!',
		allowOutsideClick: false
	});
	$('#modificarClave').modal('hide');
	$('#claveModificar').val("");

}

function mostrar(id){
	$('#cargandoModal').modal('show');
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	mostrar_form(true);
	$('#idUsuario').val('1');
	$('#apellidoNombre').val('Perez Jose');
	$('#idSucursal').val('Sucursal 1');
	$('#idSucursal').selectpicker('refresh');
	$('#usuario').val('admin');
	$('#linkModificarClave').show();
	$('#clave').val("*******");
	$('#clave').prop('readonly',true);
	$('#idRol').val('Admin');
	$('#idRol').selectpicker('refresh');
	$('#estado').val('ACTIVO');
	$('#estado').selectpicker('refresh');

	$('#idUsuarioModificar').val('1');
	$('#apellidoNombre').focus();

}

function limpiar(){
	$('#idUsuario').val("");
	$('#apellidoNombre').val("");
	$('#usuario').val("");
	$('#clave').val("");
	$('#idRol').val("");
	$('#idRol').selectpicker('refresh');
	$('#idSucursal').val("");
	$('#idSucursal').selectpicker('refresh');
	$('#estado').val("");
	$('#estado').selectpicker('refresh');
	$('#idUsuarioModificar').val("");
	$('#claveModificar').val("");
}



init();