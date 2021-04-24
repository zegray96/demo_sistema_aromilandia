function init(){
	$('#tituloPagina').text('Sistema Aromilandia - Login');
	$("#container").show(); 
	$("#preload").hide();
    $('#usuario').focus();
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

// focus de elementos
$("#usuario").keypress(function(e) {
    if (event.key == "Enter"){
        $('#clave').focus();
    }
});

$('#clave').keypress(function(event) {
    if (event.key == "Enter"){
        if ($('#usuario').val()!="" && $('#clave').val()!="") {
            $('#frmLogin').submit();
        }else{
            Swal.fire({
                title: '¡Complete los campos!',
                icon: 'error',
                allowOutsideClick: false
            });
        }
    }
});
// fin focus elementos

$('#btnVerClave').click(function (){
	
	var tipo = document.getElementById("clave");
    if(tipo.type == "password"){
        tipo.type = "text";
        $("#verClave").removeClass("fas fa-eye");
        $("#verClave").addClass("fas fa-eye-slash");
    }else{
        tipo.type = "password";
        $("#verClave").removeClass("fas fa-eye-slash");
        $("#verClave").addClass("fas fa-eye");
    }
})


init();