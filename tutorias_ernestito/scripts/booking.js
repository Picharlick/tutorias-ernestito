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

    // Envío del formulario principal (AGENDAMIENTO)
    bookingForm.addEventListener('submit', async function(e) {
        // NO USAR e.preventDefault() - Permitir que Formspree envíe

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Mostrar estado de carga
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Formspree se encargará del envío automáticamente
        // No necesitamos procesar los datos aquí
    });

    // Envío del formulario de contacto con administradores
    adminContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();  // ← ESTA LÍNEA BLOQUEA EL ENVÍO

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