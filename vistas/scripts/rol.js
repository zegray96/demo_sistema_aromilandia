var tabla;
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Roles');
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

$('#btnNuevo').click(function() {
	mostrar_form(true);
	$('#nombre').focus();
});

$('#btnCancelar').click(function() {
	mostrar_form(false);
});

$("#form").on("submit", function(e){
	nuevo_editar(e);
});

//colocar la primer letra de palabra en mayusuclas
function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

$('#nombre').blur(function() {
	$('#nombre').val(capitalizar($('#nombre').val()));
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
		"scrollX": true, //muestra el scroll scrollX
        "lengthMenu": [[25, 100, 1000], [25, 100, 1000]],
		dom: 'Bflrtip', //definimos los elementos del control de la tabla
		buttons:[
			{
				extend: 'excelHtml5',
				exportOptions: {
					columns: [1]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



		],

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[1,"asc"]] //para ordenar los registros
    }).DataTable();
}


function mostrar_form(mostrar){
	limpiar();
	if(mostrar){
		$('#listado').hide();
		$('#formulario').show();
		$('#contenedor-cabecera').css("cssText", "display:none !important");
		$('#btnGuardar').prop("disabled",false);
	}else{
		$('#listado').show();
		$('#formulario').hide();
		$('#contenedor-cabecera').css("cssText", "display:block !important");

	}
}

function limpiar(){
	$('#idRol').val("");
	$('#nombre').val("");
	$('#vConfiguracion').prop("checked",false);
	$('#vAcceso').prop("checked",false);
	$('#vClientes').prop("checked",false);
	$('#vArticulos').prop("checked",false);
	$('#vPresupuestos').prop("checked",false);
	$('#newAcceso').prop("checked",false);
	$('#newClientes').prop("checked",false);
	$('#newArticulos').prop("checked",false);
	$('#newPresupuestos').prop("checked",false);
	$('#altAcceso').prop("checked",false);
	$('#altClientes').prop("checked",false);
	$('#altArticulos').prop("checked",false);
	$('#altPresupuestos').prop("checked",false);
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
		$('#nombre').focus();
	});
	limpiar();
}

function mostrar(id){
	$('#cargandoModal').modal('show');
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	mostrar_form(true);
	$('#idRol').val('1');
	$('#nombre').val('Administrador');
	$('#vAcceso').prop('checked', true);
	$('#vClientes').prop('checked', true);
	$('#vArticulos').prop('checked', true);
	$('#vPresupuestos').prop('checked', true);
	$('#vConfiguracion').prop('checked', true);
	$('#newAcceso').prop('checked', true);
	$('#newClientes').prop('checked', true);
	$('#newArticulos').prop('checked', true);
	$('#newPresupuestos').prop('checked', true);
	$('#altAcceso').prop('checked', true);
	$('#altClientes').prop('checked', true);
	$('#altArticulos').prop('checked', true);
	$('#altPresupuestos').prop('checked', true);
}



init();