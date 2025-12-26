// Script para el formulario de reservas
$(document).ready(function() {
    // Variables globales
    var formReserva = $('#bookingForm');
    var formContacto = $('#adminContactForm');
    var modal = $('#confirmationModal');
    var btnCerrar = $('#modalCloseBtn');
    var cerrarModal = $('.close-modal');

    // Poner la fecha de hoy como mínimo
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var año = hoy.getFullYear();

    if(dia < 10) {
        dia = '0' + dia;
    }
    if(mes < 10) {
        mes = '0' + mes;
    }

    var fechaHoy = año + '-' + mes + '-' + dia;
    $('#fecha').attr('min', fechaHoy);

    // Cuando se envía el formulario principal
    formReserva.submit(function(e) {
        // Dejar que Formspree lo maneje

        var boton = $('#submitBtn');
        var textoBoton = boton.find('.btn-text');
        var loading = boton.find('.btn-loading');

        // Mostrar el loading
        textoBoton.hide();
        loading.show();
        boton.prop('disabled', true);

        // Formspree hace el resto
    });

    // Formulario de contacto con admins
    // Lo dejé comentado porque Formspree lo maneja solo
    /*
    formContacto.submit(function(e) {
        e.preventDefault();

        var email = $('#adminEmail').val();
        var asunto = $('#adminSubject').val();
        var mensaje = $('#adminMessage').val();
        var fecha = new Date();

        var datos = {
            email: email,
            subject: asunto,
            message: mensaje,
            timestamp: fecha.toISOString()
        };

        // Hacer como que se envía
        setTimeout(function() {
            // Guardar en el navegador
            var contactos = localStorage.getItem('contacts');
            if(contactos == null) {
                contactos = [];
            } else {
                contactos = JSON.parse(contactos);
            }

            datos.id = Date.now();
            contactos.push(datos);
            localStorage.setItem('contacts', JSON.stringify(contactos));

            mostrarMensaje('¡Mensaje enviado! Los administradores te contactarán pronto.');
            formContacto[0].reset();
        }, 1500);
    });
    */

    // Función para mostrar el modal
    function mostrarMensaje(texto, error) {
        var mensajeModal = $('#modalMessage');
        mensajeModal.text(texto);

        if(error == true) {
            mensajeModal.css('color', '#dc2626');
        } else {
            mensajeModal.css('color', '#1f2937');
        }

        modal.css('display', 'block');
    }

    // Cerrar el modal
    btnCerrar.click(function() {
        modal.css('display', 'none');
    });

    cerrarModal.click(function() {
        modal.css('display', 'none');
    });

    // Si hace clic afuera del modal, cerrar
    $(window).click(function(e) {
        if(e.target == modal[0]) {
            modal.css('display', 'none');
        }
    });
});