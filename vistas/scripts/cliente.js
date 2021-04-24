var tabla;
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Clientes');
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
$("#cuit").keypress(function(e) {
	if (event.key == "Enter"){
		$('#apellidoNombre').focus();
	}
});

$("#apellidoNombre").keypress(function(e) {
	if (event.key == "Enter"){
		$('#dni').focus();
	}
});

$('#dni').keypress(function(event) {
	if (event.key == "Enter"){
		$('#domicilio').focus();
	}
});

$('#domicilio').keypress(function(event) {
	if (event.key == "Enter"){
		$('#telefono').focus();
	}
});

$('#telefono').keypress(function(event) {
	if (event.key == "Enter"){
		$('#localidad').focus();
	}
});

$('#localidad').keypress(function(event) {
	if (event.key == "Enter"){
		$('#provincia').focus();
	}
});
// fin focus elementos

// input solo numeros
$('#dni').keyup(function () {
    this.value = this.value.replace(/[^0-9]/g,'');
});

$('#cuit').keyup(function () {
    this.value = this.value.replace(/[^0-9]/g,'');
});

$('#btnNuevo').click(function() {
	mostrar_form(true);
	$('#cuit').focus();
});

$('#btnCancelar').click(function() {
	mostrar_form(false);
	tabla.columns.adjust();
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

$('#apellidoNombre').blur(function() {
	$('#apellidoNombre').val(capitalizar($('#apellidoNombre').val()));
});

$('#domicilio').blur(function() {
	$('#domicilio').val(capitalizar($('#domicilio').val()));
});

$('#localidad').blur(function() {
	$('#localidad').val(capitalizar($('#localidad').val()));
});

$('#provincia').blur(function() {
	$('#provincia').val(capitalizar($('#provincia').val()));
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
					columns: [1,2,3,4,5,6,7,8,9]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6,7,8,9]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,3,4,5,6,7,8,9]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



		],

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[1,"desc"]] //para ordenar los registros
    }).DataTable();
}


function mostrar_form(mostrar){
	limpiar();
	if(mostrar){
		$('#listado').hide();
		$('#formulario').show();
		$('#contenedor-cabecera').css("cssText", "display:none !important");
		$('#btnNuevo').css("cssText", "display:none !important");
		$('#divCodCliente').hide();
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
		$('#cuit').focus();
	});
	limpiar();
	$('#divCodCliente').hide();

}

function mostrar(cod){
	$('#cargandoModal').modal('show');
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	mostrar_form(true);
	$('#codCliente').val("1");
	$('#divCodCliente').show();
	$('#codClienteText').text('Cod. Cliente: 1');
	$('#cuit').val("50500419");
	$('#apellidoNombre').val('Thor Alexander');
	$('#dni').val("50500419");
	$('#domicilio').val("Ap #472-2248 At Road");
	$('#telefono').val("(506) 189-4013");
	$('#localidad').val("C");
	$('#provincia').val("HH");
	$('#estado').val("ACTIVO");
	$('#estado').selectpicker('refresh');
	$('#cuit').focus();
}

function limpiar(){
	$('#codCliente').val("");
	$('#codClienteText').text("");
	$('#cuit').val("");
	$('#apellidoNombre').val("");
	$('#dni').val("");
	$('#telefono').val("");
	$('#domicilio').val("");
	$('#localidad').val("");
	$('#provincia').val("");
	$('#estado').val("ACTIVO");
	$('#estado').selectpicker('refresh');
}



init();