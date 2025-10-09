// Datos de tutores de ejemplo
const tutors = [
    {
        id: 1,
        name: "Santiago Ernesto",
        subject: "Matemáticas",
        grades: ["1secundaria", "2secundaria", "3secundaria"],
        rating: 4.9,
        experience: "2 años",
        university: "Universidad del Pacífico"
    },
    {
        id: 2,
        name: "Felipe Ybazexo",
        subject: "Ciencias",
        grades: ["4primaria", "5primaria", "6primaria", "1secundaria"],
        rating: 4.8,
        experience: "1 año",
        university: "UPCex"
    },
    {
        id: 3,
        name: "La chata Vásquez",
        subject: "Inglés",
        grades: ["3primaria", "4primaria", "5primaria", "6primaria", "1secundaria", "2secundaria"],
        rating: 5.0,
        experience: "3 años",
        university: "Cato (miembro de vértice)"
    },
    {
        id: 4,
        name: "David Huaman",
        subject: "Física y Química",
        grades: ["3secundaria", "4secundaria", "5secundaria"],
        rating: 4.7,
        experience: "2 años",
        university: "Sideral Carrión"
    }
];

// Cargar tutores en la página
function loadTutors() {
    const tutorsGrid = document.getElementById('tutorsGrid');

    tutors.forEach(tutor => {
        const tutorCard = document.createElement('div');
        tutorCard.className = 'tutor-card';
        tutorCard.innerHTML = `
            <div class="tutor-avatar">${tutor.name.charAt(0)}</div>
            <div class="tutor-name">${tutor.name}</div>
            <div class="tutor-subject">${tutor.subject}</div>
            <div class="tutor-grade">Grados: ${tutor.grades.map(g => g.replace('primaria', '° Primaria').replace('secundaria', '° Secundaria')).join(', ')}</div>
            <div class="tutor-rating">⭐ ${tutor.rating}/5.0</div>
            <div class="tutor-experience">Experiencia: ${tutor.experience}</div>
            <div class="tutor-university">${tutor.university}</div>
        `;
        tutorsGrid.appendChild(tutorCard);
    });
}

// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
    loadTutors();

    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'white';
        }
    });

    // Interacción con tarjetas de grado
    document.querySelectorAll('.grade-card').forEach(card => {
        card.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            document.getElementById('nivel').value = level;
            document.getElementById('agendar').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});