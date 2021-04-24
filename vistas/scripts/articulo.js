var tabla;
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Articulos');
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
$("#descripcion").keypress(function(e) {
	if (event.key == "Enter"){
		$('#precioUnitarioMayorista').focus();
	}
});

$('#precioUnitarioMayorista').keypress(function(event) {
	if (event.key == "Enter"){
		$('#precioUnitarioPublico').focus();
	}
});

$('#precioUnitarioPublico').keypress(function(event) {
	if (event.key == "Enter"){
		$('#cantidad').focus();
	}
});



// fin focus elementos

$('#btnNuevo').click(function() {
	mostrar_form(true);
	$('#descripcion').focus();
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

$('#descripcion').blur(function() {
	$('#descripcion').val(capitalizar($('#descripcion').val()));
});

// input formato moneda
$('#precioUnitarioMayorista').keyup(function(event) {

	if(event.which >= 37 && event.which <= 40){
		event.preventDefault();
	}

	$(this).val(function(index, value) {
		return value.replace(/\D/g, "").replace(/([0-9])([0-9]{2})$/, '$1,$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
	});

});

$('#precioUnitarioPublico').keyup(function(event) {

  if(event.which >= 37 && event.which <= 40){
  	event.preventDefault();
  }

  $(this).val(function(index, value) {
  	return value.replace(/\D/g, "").replace(/([0-9])([0-9]{2})$/, '$1,$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });

});

// sumar restar stock
$('#sumarStock').click(function() {
	var cantidad=$('#cantidad').val();
	var stockActual=$('#stockActual').val();

	if (cantidad!="") {
		if(stockActual==""){
			stockActual=0;
		}

		var resultado=parseInt(stockActual)+parseInt(cantidad);
		$('#stockActual').val(resultado);

		$('#cantidad').val('');
		$('#cantidad').focus();
	}else{
		$('#cantidad').focus();
	}
});

$('#restarStock').click(function() {
	var cantidad=$('#cantidad').val();
	var stockActual=$('#stockActual').val();

	if (cantidad!="") {
		if(stockActual==""){
			stockActual=0;
		}

		if(parseInt(cantidad)>parseInt(stockActual)){
			$('#stockActual').val('0');
		}else{
			var resultado=parseInt(stockActual)-parseInt(cantidad);
			$('#stockActual').val(resultado);
		}

		$('#cantidad').val('');
		$('#cantidad').focus();
	}else{
		$('#cantidad').focus();
	}
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
					columns: [1,2,3,4,5,6]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5,6]
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
		$('#divCodArticulo').hide();
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
		$('#descripcion').focus();
	});
	limpiar();
	$('#divCodArticulo').hide();
}

function mostrar(cod){
	$('#cargandoModal').modal('show');
	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	mostrar_form(true);
	$('#codArticulo').val('1');
	$('#divCodArticulo').show();
	$('#codArticuloText').text('Cod. Articulo: 1');
	$('#descripcion').val('egestas ligula. Nullam feugiat');
	$('#precioUnitarioMayorista').val('893,85');
	$('#precioUnitarioPublico').val('504,49');
	$('#stockActual').val("120");
	$('#estado').val('ACTIVO');
	$('#estado').selectpicker('refresh');
	$('#descripcion').focus();
}

function limpiar(){
	$('#codArticulo').val("");
	$('#codArticuloText').text("");
	$('#descripcion').val("");
	$('#precioUnitarioMayorista').val("");
	$('#precioUnitarioPublico').val("");
	$('#stockActual').val("");
	$('#cantidad').val("");
	$('#estado').val("ACTIVO");
	$('#estado').selectpicker('refresh');
}



init();