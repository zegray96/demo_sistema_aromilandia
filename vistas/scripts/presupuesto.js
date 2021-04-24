var tabla;
var total;
var idFila;
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Presupuestos');
	listar_hoy();
	mostrar_form(false);
	$("#wrapper").show();
	$("#preload").hide();

}

// Rango fechas
$('#divFiltrarPorFechas .input-daterange').datepicker({
	format: 'dd/mm/yyyy',
	autoclose: true,
	todayHighlight: true,
	todayBtn: 'linked',
	language: 'es',
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

// ajustamos las columnas de tabla
$('#sidebarToggleTop').click(function(e){
    setTimeout(function(){
        tabla.columns.adjust();
    },300);
});

// formato fecha
function format_fecha(elEvento,idElem){
	var evento = elEvento || window.event;
	if(evento.keyCode == 8){
	} else {
		var fecha = document.getElementById(idElem);
		if(fecha.value.length == 2 || fecha.value.length == 5){
			fecha.value += "/";
		}
	}
}

$("#fechaPresupuesto").keydown(function(event) {
  format_fecha(event,'fechaPresupuesto');
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
$("#codCliente").keypress(function(event) {
	var codCliente=$('#codCliente').val();

	if (event.key == "Enter"){
		if ($('#codCliente').val()=="") {
			$('#buscarClienteParaPresu').modal('show');
		}else{

			//traemos con ajax datos de cliente
			$.post("../ajax/cliente.php?op=buscar_cliente_manual", {codCliente: codCliente}, function(data){
				data = JSON.parse(data);
				if (data!=null) {
					$('#codCliente').val(data.cod_cliente);
					$('#dniPresu').val(data.dni);
					$('#cuitPresu').val(data.cuit);
					$('#apellidoNombrePresu').val(data.apellido_nombre);
					$('#listarPresupuestosPorCliente').modal('show');
				}else{
					$('#codCliente').val("");
					$('#dniPresu').val("");
					$('#cuitPresu').val("");
					$('#apellidoNombrePresu').val("");
				}
			});

			$('#codArticulo').focus();
		}

	}
});

// focus de elementos
$("#codCliente").blur(function(event) {
	var codCliente=$('#codCliente').val();

	//traemos con ajax datos de cliente
	$.post("../ajax/cliente.php?op=buscar_cliente_manual", {codCliente: codCliente}, function(data){
		data = JSON.parse(data);
		if (data!=null) {
			$('#codCliente').val(data.cod_cliente);
			$('#dniPresu').val(data.dni);
			$('#cuitPresu').val(data.cuit);
			$('#apellidoNombrePresu').val(data.apellido_nombre);
		}else{
			$('#codCliente').val("");
			$('#dniPresu').val("");
			$('#cuitPresu').val("");
			$('#apellidoNombrePresu').val("");
		}
	});
});

$('#codArticulo').keypress(function(event) {
	$('#descripcion').val("");
	$('#precioUnitario').val("");
	$('#cantidad').val("");
	if (event.key == "Enter"){
		if ($('#codArticulo').val()=="") {
			$('#buscarArticulo').modal('show');
		}else{
			if ($('#codArticulo').val()=="1") {
				$('#descripcion').prop('readonly',false);
				$('#precioUnitario').prop('readonly',false);
				$('#descripcion').focus();
			}else{
				$('#cantidad').focus();
			}

		}
	}
});

$('#codArticulo').blur(function() {
	if ($('#codArticulo').val()!=1) {
		$('#descripcion').prop('readonly',true);
		$('#precioUnitario').prop('readonly',true);
	}
});


$('#descripcion').keypress(function(event) {
	if (event.key == "Enter"){
		$('#precioUnitario').focus();
	}
});

$('#precioUnitario').keypress(function(event) {
	if (event.key == "Enter"){
		$('#cantidad').focus();
	}
});

$('#cantidad').keypress(function(event) {
	if (event.key == "Enter"){
		var codArticulo = $('#codArticulo').val();
		var descripcion = $('#descripcion').val();
		var cantidad = $('#cantidad').val();
		var precioUnitarioConComa = $('#precioUnitario').val();
		nuevo_detalle(codArticulo,descripcion,cantidad,precioUnitarioConComa);
	}
});
// fin focus elementos

// input formato moneda
$('#precioUnitario').keyup(function(event) {

  if(event.which >= 37 && event.which <= 40){
  	event.preventDefault();
  }

  $(this).val(function(index, value) {
  	return value.replace(/\D/g, "").replace(/([0-9])([0-9]{2})$/, '$1,$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });

});

$('#btnNuevo').click(function() {
	mostrar_form(true);
	$('#codCliente').focus();
});

$('#btnCancelar').click(function() {
	mostrar_form(false);
	tabla.columns.adjust();
});

$("#form").on("submit", function(e){
	nuevo_editar(e);
});

// formato fecha
function format_fecha(elEvento,idElem){
	var evento = elEvento || window.event;
	if(evento.keyCode == 8){
	} else {
		var fecha = document.getElementById(idElem);
		if(fecha.value.length == 2 || fecha.value.length == 5){
			fecha.value += "/";
		}
	}
}

$("#fechaVenta").keydown(function(event) {
  format_fecha(event,'fechaVenta');
});

function mostrar_form(mostrar){
	limpiar();
	if(mostrar){
		$('#listado').hide();
		$('#formulario').show();
		$('#contenedor-cabecera').css("cssText", "display:none !important");
		$('#btnNuevo').css("cssText", "display:none !important");
		$('#divFiltrar').css("cssText", "display:none !important");
		$('#btnGuardar').prop("disabled",false);
	}else{
		$('#listado').show();
		$('#formulario').hide();
		$('#contenedor-cabecera').css("cssText", "display:block !important");
		$('#btnNuevo').css("cssText", "display:block !important");
		$('#divFiltrar').css("cssText", "display:block !important");
	}
}

function limpiar(){
	idFila=0;
	$('#fechaPresupuesto').datepicker({
		format: 'dd/mm/yyyy',
		todayBtn: 'linked',
		todayHighlight: true,
		autoclose: true,
		language: 'es',
	}).datepicker("setDate", new Date());

	$('#idPresupuesto').val("");
	$('#estadoPresu').val("PAGADO");
	$('#estadoPresu').selectpicker("refresh");
	$('#nroPresupuesto').val("En carga");
	$('#horaPresupuesto').val("En carga");
	$('#codCliente').val("");
	$('#dniPresu').val("");
	$('#cuitPresu').val("");
	$('#apellidoNombrePresu').val("");
	$('#codArticulo').val("");
	$('#descripcion').val("");
	$('#precioUnitario').val("");
	$('#cantidad').val("");
	$('#tipoDesc').val("sin_descuento");
	$('#tipoDesc').selectpicker("refresh");
	$('#valorDesc').val("");
	$('#montoTotal').val("");

	$('#cuit').val("");
	$('#apellidoNombre').val("");
	$('#dni').val("");
	$('#telefono').val("");
	$('#domicilio').val("");
	$('#localidad').val("");
	$('#provincia').val("");
	$('#estado').val("ACTIVO");
	$('#estado').selectpicker('refresh');

	$('#buscarNombreEnPresu').val("");
    $('#buscarDniEnPresu').val("");


    total=0.0;

    $('#montoTotal').val("0,00");

    $(".filas").remove();
}

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
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5,7,8]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



		],

		"ajax":{
			url:'../ajax/presupuesto.php?op=listar',
			type: 'get',
			dataType: 'json',
			error: function(e){
				console.log(e.responseText);
			}
		},

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[4,"desc"]] //para ordenar los registros
    }).DataTable();
}

function listar_hoy(){
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
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5,7,8]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



		],

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[4,"desc"]] //para ordenar los registros
    }).DataTable();
}


function nuevo_editar(e){
	$('#cargandoModal').modal('show');
	e.preventDefault();
	var detalleVacio = detalle_vacio();

	if (detalleVacio==true){
		$('#cargandoModal').fadeOut(300,function(){
			$('#cargandoModal').modal('hide');
		});
		Swal.fire({
			icon: 'error',
			title: '¡Ingrese articulos al presupuesto!',
			allowOutsideClick: false
		});

	}else{
		$('#cargandoModal').fadeOut(300,function(){
			$('#cargandoModal').modal('hide');
		});

		Swal.fire({
			icon: 'success',
			title: '¡Guardado con exito!',
			allowOutsideClick: false
		}).then(function() {
			$('#codCliente').focus();
		});
		// imprimir_presupuesto(resultadoId);
		limpiar();

	}

}


function mostrar(id){
	$('#cargandoModal').modal('show');
	// ocultamos este modal en caso de que este abierto
	$('#listarPresupuestosPorCliente').modal('hide');

	$('#cargandoModal').fadeOut(300,function(){
		$('#cargandoModal').modal('hide');
	});
	mostrar_form(true);

	$("#idPresupuesto").val('1');
	$("#nroPresupuesto").val('0000001');
	$("#horaPresupuesto").val('08:00');
	$('#estadoPresu').val('PAGADO');
	$('#estadoPresu').selectpicker('refresh');
	$('#fechaPresupuesto').datepicker("setDate", '2020-09-19');
	$("#codCliente").val('1');
	$("#dniPresu").val('16501114 8862');
	$("#apellidoNombrePresu").val('Alexis Dotson');
	$("#cuitPresu").val('1');
	$("#montoTotal").val('687,78');
	$('#tipoDesc').val('sin_descuento');
	$('#tipoDesc').selectpicker('refresh');
	$('#valorDesc').val("");
}


$('#valorDesc').keyup(function(event) {
	calcular_total();
});

$('#tipoDesc').on('change', function() {
	calcular_total();
	$('#valorDesc').focus();
});



$('#btnBuscarCliente').click(function() {
	$('#buscarClienteParaPresu').modal('show');
});

// Busqueda dentro de modal
$('#buscarNombreEnPresu').on( 'keyup', function () {
    tablaClientes.columns(1).search(this.value).draw();
});

$('#buscarDniEnPresu').on( 'keyup', function () {
    tablaClientes.columns(3).search(this.value).draw();
});

// focus de elementos
$("#buscarNombreEnPresu").keypress(function(e) {
	if (event.key == "Enter"){
		$('#buscarDniEnPresu').focus();
	}
});

$('#buscarDniEnPresu').keypress(function(event) {
	if (event.key == "Enter"){
		$('#buscarNombreEnPresu').focus();
	}
});
// fin focus elementos

// agregar cliente
function agregar_cliente(codCliente,dni,apellidoNombre,cuit){
	$('#codCliente').val(codCliente);
	$('#dniPresu').val(dni);
	$('#apellidoNombrePresu').val(apellidoNombre);
	$('#cuitPresu').val(cuit);
	$('#buscarClienteParaPresu').modal('hide');
	$('#listarPresupuestosPorCliente').modal('show');
}

// Al abrir modal buscar clientes para venta
$('#buscarClienteParaPresu').on('shown.bs.modal', function () {
	tablaClientes = $('#tblClientesPresu').dataTable({
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
       	dom: 'rtip', //definimos los elementos del control de la tabla

       	"bDestroy": true,
		"iDisplayLength": 25, //cada cuantos registros realizamos la paginacion
		"order":[[1,"asc"]] //para ordenar los registros
	}).DataTable();
	$('#buscarNombreEnPresu').focus();
});

// al ocultar buscar cliente para venta
$('#buscarClienteParaPresu').on('hidden.bs.modal', function (e) {
  $('#buscarNombreEnPresu').val("");
  $('#buscarDniEnPresu').val("");
  // var table = $('#tblClientesPresu').DataTable();
  // table.clear().draw();
});




// Al abrir modal buscar presupuestos por cliente
$('#listarPresupuestosPorCliente').on('shown.bs.modal', function () {
	var codCliente=$('#codCliente').val();
   	tablaPresupuestosPorCliente = $('#tblPresupuestosPorCliente').dataTable({
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
       	dom: 'rtip', //definimos los elementos del control de la tabla

       	// "ajax":{
       	// 	url:'../ajax/presupuesto.php?op=listar_presupuestos_por_cliente_presup',
       	// 	data: {'codCliente': codCliente},
       	// 	type: 'get',
       	// 	dataType: 'json',
       	// 	error: function(e){
       	// 		console.log(e.responseText);
       	// 	}
       	// },

		"bDestroy": true,
		"iDisplayLength": 25, //cada cuantos registros realizamos la paginacion
		"order":[[3,"desc"]] //para ordenar los registros
   }).DataTable();


});

$('#btnAceptarPresupuesto').click(function() {
	$('#listarPresupuestosPorCliente').modal('hide');
});

// al ocultar buscar presupuestos por cliente
$('#listarPresupuestosPorCliente').on('hidden.bs.modal', function (e) {
  var table = $('#tblPresupuestosPorCliente').DataTable();
  table.clear().draw();
  $('#codArticulo').focus();
});


$("#listarPresupuestosPorCliente").keydown(function (tecla) {
	if (tecla.keyCode == 13) {
		$("#listarPresupuestosPorCliente").modal('hide');
	}
});



$('#btnBuscarArticulo').click(function() {
	$('#buscarArticulo').modal('show');
});

// Busqueda dentro de modal
$('#buscarDescripcionEnPresu').on( 'keyup', function () {
    tablaArticulos.columns(2).search(this.value).draw();
});

$('#buscarCodArtEnPresu').on( 'keyup', function () {
    tablaArticulos.columns(1).search(this.value).draw();
});

// focus de elementos
$("#buscarDescripcionEnPresu").keypress(function(e) {
	if (event.key == "Enter"){
		$('#buscarCodArtEnPresu').focus();
	}
});

$('#buscarCodArtEnPresu').keypress(function(event) {
	if (event.key == "Enter"){
		$('#buscarDescripcionEnPresu').focus();
	}
});
// fin focus elementos

// agregar articulo
function agregar_articulo(codArticulo,descripcion,precioUnitario,tipoPrecio){
	if (tipoPrecio!="M" && tipoPrecio!="P") {
		Swal.fire({
			icon: 'error',
			title: 'Error al traer articulo'
		});
	}else{
		if (tipoPrecio=="M") {
			descripcion+=' (Mayorista)';
		}else{
			if (tipoPrecio=="P") {
				descripcion+=' (Publico)';
			}
		}
		$('#codArticulo').val(codArticulo);
		$('#descripcion').val(descripcion);
		$('#precioUnitario').val(precioUnitario);
		$('#buscarArticulo').modal('hide');
		$('#descripcion').prop('readonly',true);
		$('#precioUnitario').prop('readonly',true);
		$('#cantidad').focus();
	}

}

// Al abrir modal buscar clientes para venta
$('#buscarArticulo').on('shown.bs.modal', function () {
   tablaArticulos = $('#tblArticulos').dataTable({
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
       	dom: 'rtip', //definimos los elementos del control de la tabla

		"bDestroy": true,
		"iDisplayLength": 25, //cada cuantos registros realizamos la paginacion
		"order":[[1,"asc"]] //para ordenar los registros
   }).DataTable();
   $('#buscarDescripcionEnPresu').focus();
});

// al ocultar buscar cliente para venta
$('#buscarArticulo').on('hidden.bs.modal', function (e) {
  $('#buscarDescripcionEnPresu').val("");
  $('#buscarCodArtEnPresu').val("");
  // var table = $('#tblArticulos').DataTable();
  // table.clear().draw();
});


$('#btnAgregarDetalle').click(function (){
	var codArticulo = $('#codArticulo').val();
	var descripcion = $('#descripcion').val();
	var cantidad = $('#cantidad').val();
	var precioUnitarioConComa = $('#precioUnitario').val();
	nuevo_detalle(codArticulo,descripcion,cantidad,precioUnitarioConComa);
});

function detalle_vacio(){
	let filas = $('#tblDetalles').find('tbody tr').length;

	if(filas > 0) {
		return false;
	}
	else {
		return true;
	}
}

//nuevo detalle
function nuevo_detalle(codArticulo,descripcion,cantidad,precioUnitarioConComa){
	// quitamos separador de miles
	var precioUnitarioSinComa = precioUnitarioConComa.replace(/[.]/g,'');
	// modificamos separador de decimal
	precioUnitarioSinComa = precioUnitarioSinComa.replace(/[,]/g,'.');

	if (precioUnitarioSinComa<=9999.99) {
		precioUnitarioConComa = precioUnitarioConComa.replace(/[.]/g,'');
	}

	if (isNaN(precioUnitarioSinComa) || precioUnitarioConComa==0 || cantidad<=0 || descripcion=="" || codArticulo=="") {
		Swal.fire({
			icon: 'warning',
			title: '¡Complete campos de articulo!',
			allowOutsideClick: false
		});
	}else{
		var idFilaEncontrado="";
		if (codArticulo!=1) {
			idFilaEncontrado = buscar_en_detalle(codArticulo);
		}

		if(idFilaEncontrado!=""){
			$("#"+idFilaEncontrado+"").remove();
			calcular_total();
		}

			var subtotalSinComa = precioUnitarioSinComa * cantidad;
			var subtotalConComa = Intl.NumberFormat("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(subtotalSinComa);


			var fila='<tr class="filas" id="fila'+idFila+'">'+
			'<td style="display: none"><input type="hidden" name="codArticulo[]" value="'+codArticulo+'">'+codArticulo+'</td>'+

			// acciones
			'<td><button type="button" class="btn btn-danger btn-sm" onclick="borrar_detalle('+idFila+')"><i class="fas fa-trash-alt"></i></button>'+
				' <button type="button" class="btnVerDetalle btn btn-info btn-sm"><i class="fas fa-eye"></i></button></td>'+

			'<td class="nr"><input type="hidden" name="descripcion[]" value="'+descripcion+'">'+descripcion+'</td>'+
			'<td><input type="hidden" name="cantidad[]" value="'+cantidad+'">'+cantidad+'</td>'+
			'<td><input class="precioUnitario" type="hidden" name="precioUnitario[]" value="'+precioUnitarioSinComa+'">$'+precioUnitarioConComa+'</td>'+
			'<td><input type="hidden" name="subtotal[]" value="'+subtotalSinComa+'">$'+subtotalConComa+'</td>'+
			'</tr>';
			idFila++;
			$("#tblDetalles").append(fila);
			calcular_total();

			$('#codArticulo').val("");
			$('#descripcion').val("");
			$('#cantidad').val("");
			$('#precioUnitario').val("");

			$('#descripcion').prop('readonly',true);
			$('#precioUnitario').prop('readonly',true);

			$('#codArticulo').focus();

	}
}

 // ver detalle
 $("#tblDetalles").on('click','.btnVerDetalle',function(){
         var currentRow=$(this).closest("tr");

         var idFila=currentRow.attr('id');

         var codArticulo=currentRow.find("td:eq(0) input[type='hidden']").val();
         var descripcion=currentRow.find("td:eq(2) input[type='hidden']").val();
         var precioUnitario=currentRow.find("td:eq(4) input[type='hidden']").val();
         var cantidad=currentRow.find("td:eq(3) input[type='hidden']").val();

         $('#codArticulo').val(codArticulo);
         $('#descripcion').val(descripcion);
         $('#precioUnitario').val(Intl.NumberFormat("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(precioUnitario));
         $('#cantidad').val(cantidad);

         $('#cantidad').focus();


});



function borrar_detalle(i){
	$("#fila"+i).remove();
	calcular_total();
}

function calcular_total(){
	total = 0.0;
	var valorDesc=$('#valorDesc').val();
	var tipoDesc=$('#tipoDesc').val();

	if (valorDesc=="") {
		valorDesc=0;
	}
	//Recorro todos los tr ubicados en el tbody
	$('#tblDetalles tbody').find('tr').each(function () {
		//Voy incrementando las variables segun la fila ( :eq(0) representa la fila 1 )
		total+= parseFloat($(this).find("td:eq(5) input[type='hidden']").val());
	});

	if (tipoDesc=="monto") {
		total-=valorDesc;
	}else{
		if (tipoDesc=="porcentaje") {
			total-=((total*valorDesc)/100);
		}
	}

	$("#montoTotal").val(Intl.NumberFormat("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(total));
}

function buscar_en_detalle(codArticulo){
	var idFilaEncontrado="";

	if ($('table#tblDetalles tbody tr').length > 0){
		$('table#tblDetalles tbody tr').each(function(){
			if ($(this).find("td:eq(0) input[type='hidden']").val() == codArticulo){
				idFilaEncontrado = $(this).attr('id');
			}
		});
	}
	return idFilaEncontrado;
}

$('#btnFiltrarPorFechas').click(function() {
	filtrar_por_fechas();
});

function filtrar_por_fechas(){

	var fechaIni=$('#fechaIniFiltrar').val();
	var fechaFin=$('#fechaFinFiltrar').val();

	if (fechaIni=="" || fechaFin=="") {
		Swal.fire({
			icon:'error',
			title:'¡Seleccione fechas!',
			allowOutsideClick: false
		});

	}else{
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
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5,7,8]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



			],

			"bDestroy": true,
			"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
			"order":[[4,"desc"]] //para ordenar los registros
		}).DataTable();

		$('#filtrarPorFecha').modal('hide');
	}
}


// al ocultar buscar cliente para venta
$('#filtrarPorFecha').on('hidden.bs.modal', function (e) {
	$('#fechaIniFiltrar').datepicker("setDate", '');
	$('#fechaFinFiltrar').datepicker("setDate", '');
});


function listar_presupuestos_por_cliente_filtro(codCliente){

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
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fas fa-file-excel"></i>',
				className: 'btn btn-success',
				titleAttr: 'Exportar a Excel',

			},


			{
				extend: 'csvHtml5',
				exportOptions: {
					columns: [1,2,3,4,5,6,7,8]
				},
				text: '<i class="fa fa-file-csv"></i>',
				className: 'btn btn-warning',
				titleAttr: 'Exportar a CSV',

			},


			{
				extend: 'print',
				exportOptions: {
					columns: [1,2,3,4,5,7,8]
				},
				text: '<i class="fa fa-print"></i>',
				className: 'btn btn-info',
				titleAttr: 'Imprimir',

			},



			],

			"bDestroy": true,
			"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
			"order":[[4,"desc"]] //para ordenar los registros
		}).DataTable();

		$('#filtrarPorCliente').modal('hide');
}

// Al abrir modal filtrar por cliente
$('#filtrarPorCliente').on('shown.bs.modal', function () {
	filtrarPorCliente = $('#tblFiltrarPorCliente').dataTable({
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
       	dom: 'rtip', //definimos los elementos del control de la tabla

       	"bDestroy": true,
		"iDisplayLength": 25, //cada cuantos registros realizamos la paginacion
		"order":[[1,"asc"]] //para ordenar los registros
	}).DataTable();
	$('#buscarNombreEnFiltrar').focus();
});

// al ocultar buscar cliente para venta
$('#filtrarPorCliente').on('hidden.bs.modal', function (e) {
	$('#buscarNombreEnFiltrar').val("");
	$('#buscarDniEnFiltrar').val("");
	// var table = $('#tblFiltrarPorCliente').DataTable();
	// table.clear().draw();
});

$('#buscarNombreEnFiltrar').keypress(function(event) {
	if (event.key == "Enter"){
		$('#buscarDniEnFiltrar').focus();
	}
});

$('#buscarDniEnFiltrar').keypress(function(event) {
	if (event.key == "Enter"){
		$('#buscarNombreEnFiltrar').focus();
	}
});

// Busqueda dentro de modal filtrar
$('#buscarNombreEnFiltrar').on( 'keyup', function () {
    filtrarPorCliente.columns(1).search(this.value).draw();
});

$('#buscarDniEnFiltrar').on( 'keyup', function () {
    filtrarPorCliente.columns(3).search(this.value).draw();
});


function imprimir_presupuesto(id){

}

$("#formNuevoCliente").on("submit", function(e){
	nuevo_cliente(e);
});

$('#btnNuevoCliente').click(function(){
	$('#nuevoCliente').modal('show');
});

$('#btnCancelarCliente').click(function() {
	$('#nuevoCliente').modal('hide');
});

// Al abrir modal nuevo cliente
$('#nuevoCliente').on('shown.bs.modal', function () {
	$('#cuit').focus();
});

// Al ocultar modal nuevo cliente
$('#nuevoCliente').on('hidden.bs.modal', function () {
	$('#cuit').val("");
	$('#apellidoNombre').val("");
	$('#dni').val("");
	$('#telefono').val("");
	$('#domicilio').val("");
	$('#localidad').val("");
	$('#provincia').val("");
	$('#estado').val("ACTIVO");
	$('#estado').selectpicker('refresh');
});

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

function nuevo_cliente(e){
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
		$('#codArticulo').focus();
	});
	$('#nuevoCliente').modal('hide');

}


function eliminar_presupuesto(idPresupuesto){
	Swal.fire({
		title: '¿Esta seguro que desea eliminar el registro?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		showConfirmButton:true,
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
		reverseButtons: true,
		allowOutsideClick: false
	}).then((result) => {
		if (result.value) {
			$("#cargandoModal").modal('show');
			$("#cargandoModal").modal('hide');
			Swal.fire({
				icon: 'success',
				title: '¡Eliminado con exito!',
				allowOutsideClick: false
			});
		}
	});

}




init();