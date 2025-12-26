// Lista de tutores
var tutores = [
    {
        id: 1,
        name: "Nombre cualquiera",
        subject: "Matemáticas",
        grades: ["1secundaria", "2secundaria", "3secundaria"],
        rating: 4.9,
        experience: "2 años",
        university: "Universidad del Pacífico"
    },
    {
        id: 2,
        name: "Nombre cualquiera",
        subject: "Ciencias",
        grades: ["4primaria", "5primaria", "6primaria", "1secundaria"],
        rating: 4.8,
        experience: "1 año",
        university: "PUCP"
    },
    {
        id: 3,
        name: "Nombre cualquiera",
        subject: "Inglés",
        grades: ["3primaria", "4primaria", "5primaria", "6primaria", "1secundaria", "2secundaria"],
        rating: 5.0,
        experience: "3 años",
        university: "UP"
    },
    {
        id: 4,
        name: "Nombre cualquiera",
        subject: "Física y Química",
        grades: ["3secundaria", "4secundaria", "5secundaria"],
        rating: 4.7,
        experience: "2 años",
        university: "PUCP"
    }
];

// Función que carga los tutores en la página
function cargarTutores() {
    var contenedor = document.getElementById('tutorsGrid');

    for(var i = 0; i < tutores.length; i++) {
        var tutor = tutores[i];

        // Crear la tarjeta del tutor
        var tarjeta = document.createElement('div');
        tarjeta.className = 'tutor-card';

        // Obtener la primera letra del nombre
        var primeraLetra = tutor.name.charAt(0);

        // Formatear los grados
        var gradosFormateados = '';
        for(var j = 0; j < tutor.grades.length; j++) {
            var grado = tutor.grades[j];
            if(grado.indexOf('primaria') != -1) {
                grado = grado.replace('primaria', '° Primaria');
            }
            if(grado.indexOf('secundaria') != -1) {
                grado = grado.replace('secundaria', '° Secundaria');
            }

            if(j > 0) {
                gradosFormateados = gradosFormateados + ', ';
            }
            gradosFormateados = gradosFormateados + grado;
        }

        // Crear el HTML de la tarjeta
        var html = '<div class="tutor-avatar">' + primeraLetra + '</div>';
        html = html + '<div class="tutor-name">' + tutor.name + '</div>';
        html = html + '<div class="tutor-subject">' + tutor.subject + '</div>';
        html = html + '<div class="tutor-grade">Grados: ' + gradosFormateados + '</div>';
        html = html + '<div class="tutor-rating">⭐ ' + tutor.rating + '/5.0</div>';
        html = html + '<div class="tutor-experience">Experiencia: ' + tutor.experience + '</div>';
        html = html + '<div class="tutor-university">' + tutor.university + '</div>';

        tarjeta.innerHTML = html;
        contenedor.appendChild(tarjeta);
    }
}

// Cuando carga la página
window.onload = function() {
    cargarTutores();

    // Para los enlaces que van a secciones de la página
    var enlaces = document.querySelectorAll('a[href^="#"]');
    for(var i = 0; i < enlaces.length; i++) {
        enlaces[i].onclick = function(e) {
            e.preventDefault();
            var href = this.getAttribute('href');
            var seccion = document.querySelector(href);
            if(seccion != null) {
                seccion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
    }

    // Cambiar el navbar cuando haces scroll
    window.onscroll = function() {
        var navbar = document.querySelector('.navbar');
        var scroll = window.scrollY;

        if(scroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'white';
        }
    };

    // Click en las tarjetas de grado
    var tarjetasGrado = document.querySelectorAll('.grade-card');
    for(var i = 0; i < tarjetasGrado.length; i++) {
        tarjetasGrado[i].onclick = function() {
            var nivel = this.getAttribute('data-level');
            var selectNivel = document.getElementById('nivel');
            selectNivel.value = nivel;

            var seccionAgendar = document.getElementById('agendar');
            seccionAgendar.scrollIntoView({
                behavior: 'smooth'
            });
        };
    }
};