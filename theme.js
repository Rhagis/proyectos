/**
 * Tema: se guarda en localStorage ("light" o "dark")
 * y se refleja en <html data-theme="..."> para que el CSS cambie los colores.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Referencias base del documento y del botón de alternar tema.
    var html = document.documentElement;
    var btn = document.getElementById("theme-toggle");

    // Si no existe el botón en el HTML, se evita ejecutar el resto del script.
    if (!btn) return;

    // Elementos internos del botón (texto e icono).
    var label = btn.querySelector(".dark-mode__label");
    var icon = btn.querySelector(".dark-mode__icon");

    // Sincroniza estado visual y accesible del botón según tema actual.
    function actualizarBoton() {
        var oscuro = html.getAttribute("data-theme") === "dark";
        btn.setAttribute("aria-pressed", oscuro ? "true" : "false");
        if (label) {
            label.textContent = oscuro ? "Modo claro" : "Modo oscuro";
        }
        if (icon) {
            icon.textContent = oscuro ? "\u2600" : "\u263E";
        }
    }

    // Estado inicial al cargar la página.
    actualizarBoton();

    // Alterna el tema, lo persiste y actualiza el contenido del botón.
    btn.addEventListener("click", function () {
        var siguiente = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", siguiente);
        try {
            // Persistencia para recordar la preferencia entre recargas.
            localStorage.setItem("theme", siguiente);
        } catch (e) { }
        actualizarBoton();
    });
});

// Botones de color: cada uno alterna su color de texto
// entre blanco y su color representativo.
const btnRojo = document.querySelector(".btn-rojo");
const btnAzul = document.querySelector(".btn-azul");
const btnVerde = document.querySelector(".btn-verde");

// Alterna color de texto del botón rojo.
btnRojo.addEventListener('click', () => {
    if (btnRojo.style.color != 'red') {
        btnRojo.style.color = 'red';
    }
    else {
        btnRojo.style.color = 'white';
    }
});

// Alterna color de texto del botón azul.
btnAzul.addEventListener('click', () => {
    if (btnAzul.style.color != 'blue') {
        btnAzul.style.color = 'blue';
    }
    else {
        btnAzul.style.color = 'white';
    }
});

// Alterna color de texto del botón verde.
btnVerde.addEventListener('click', () => {
    if (btnVerde.style.color != 'green') {
        btnVerde.style.color = 'green';
    }
    else {
        btnVerde.style.color = 'white';
    }
});