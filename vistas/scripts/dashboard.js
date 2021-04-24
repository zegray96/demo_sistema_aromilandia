tabla=$('#tblListado')
function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Dashboard');
	$("#wrapper").show();
	$("#preload").hide();
	inicializar_tabla();
}

// ajustamos las columnas de tabla
$('#sidebarToggleTop').click(function(e){
    setTimeout(function(){
        tabla.columns.adjust();
    },300);
});

// Rango fechas
$('#divFiltrarPorFechas .input-daterange').datepicker({
	format: 'dd/mm/yyyy',
	autoclose: true,
	todayHighlight: true,
	todayBtn: 'linked',
	language: 'es',
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

$("#fechaIniFiltrar").keydown(function(event) {
  format_fecha(event,'fechaIniFiltrar');
});

$("#fechaFinFiltrar").keydown(function(event) {
  format_fecha(event,'fechaFinFiltrar');
});

$('#btnCalcularTotalVentas').click(function() {
	calcular_total();
})

function calcular_total(){
	var idSucursal = $('#idSucursal').val();
	var fechaIni = $('#fechaIniFiltrar').val();
	var fechaFin = $('#fechaFinFiltrar').val();

	if (fechaIni == "" || fechaFin == "")  {
		Swal.fire({
			icon: 'error',
			title: '¡Seleccione Fechas!',
			allowOutsideClick: false
		});
	}else{

		tabla=$('#tblListado').dataTable({
		"language":{
			"url": "../assets/json/Spanish.json"
		},
		"scrollY": '48vh', //tamaño de barra de desplazamiento
		"scrollX": true, //muestra el scroll scrollX
		dom: 'rtip', //definimos los elementos del control de la tabla

		"bDestroy": true,
		"iDisplayLength":25, //cada cuantos registros realizamos la paginacion
		"order":[[3,"desc"]] //para ordenar los registros
	}).DataTable();
		$('#totalPresupuestos').text('$4300,00');

	}
}

function inicializar_tabla(){
	tabla=$('#tblListado').dataTable({
        "language":{
        		"url": "../assets/json/Spanish.json"
        },
		dom: 'rtip', //definimos los elementos del control de la tabla
    }).DataTable();
}



init();