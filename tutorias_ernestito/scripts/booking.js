// Manejo del formulario de agendamiento
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const adminContactForm = document.getElementById('adminContactForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const closeModal = document.querySelector('.close-modal');

    // Configurar fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').min = today;

    // Envío del formulario principal
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Mostrar estado de carga
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        const formData = {
            studentName: document.getElementById('studentName').value,
            parentName: document.getElementById('parentName').value,
            nivel: document.getElementById('nivel').value,
            materia: document.getElementById('materia').value,
            modalidad: document.getElementById('modalidad').value,
            fecha: document.getElementById('fecha').value,
            horario: document.getElementById('horario').value,
            frecuencia: document.getElementById('frecuencia').value,
            contacto: document.getElementById('contacto').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value,
            timestamp: new Date().toISOString()
        };

        try {
            // Simular envío (en producción esto iría a un servidor)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Guardar en localStorage como respaldo
            const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            existingBookings.push({
                ...formData,
                id: Date.now()
            });
            localStorage.setItem('bookings', JSON.stringify(existingBookings));

            showConfirmation('¡Solicitud enviada exitosamente! Nos contactaremos contigo dentro de las próximas 24 horas.');
            bookingForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showConfirmation('Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente o contáctanos directamente.', true);
        } finally {
            // Restaurar botón
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Envío del formulario de contacto con administradores
    adminContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            email: document.getElementById('adminEmail').value,
            subject: document.getElementById('adminSubject').value,
            message: document.getElementById('adminMessage').value,
            timestamp: new Date().toISOString()
        };

        try {
            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Guardar en localStorage
            const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            existingContacts.push({
                ...formData,
                id: Date.now()
            });
            localStorage.setItem('contacts', JSON.stringify(existingContacts));

            showConfirmation('¡Mensaje enviado! Los administradores te contactarán pronto.');
            adminContactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showConfirmation('Error al enviar el mensaje. Por favor, intenta nuevamente.', true);
        }
    });

    // Mostrar modal de confirmación
    function showConfirmation(message, isError = false) {
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = message;
        modalMessage.style.color = isError ? '#dc2626' : '#1f2937';
        confirmationModal.style.display = 'block';
    }

    // Cerrar modal
    modalCloseBtn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    closeModal.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
});