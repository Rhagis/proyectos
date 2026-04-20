/**
 * Tema: se guarda en localStorage ("light" o "dark")
 * y se refleja en <html data-theme="..."> para que el CSS cambie los colores.
 */
document.addEventListener("DOMContentLoaded", function () {
    var html = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var label = btn.querySelector(".dark-mode__label");
    var icon = btn.querySelector(".dark-mode__icon");

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

    actualizarBoton();

    btn.addEventListener("click", function () {
        var siguiente = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", siguiente);
        try {
            localStorage.setItem("theme", siguiente);
        } catch (e) { }
        actualizarBoton();
    });
});

const btnRojo = document.querySelector(".btn-rojo")
const btnAzul = document.querySelector(".btn-azul")
const btnVerde = document.querySelector(".btn-verde")

btnRojo.addEventListener('click', () => {
    if (btnRojo.style.color != 'red') {
        btnRojo.style.color = 'red'
    }
    else {
        btnRojo.style.color = 'white'
    }
})
btnAzul.addEventListener('click', () => {
    if (btnAzul.style.color != 'blue') {
        btnAzul.style.color = 'blue'
    }
    else {
        btnAzul.style.color = 'white'
    }
})
btnVerde.addEventListener('click', () => {
    if (btnVerde.style.color != 'green') {
        btnVerde.style.color = 'green'
    }
    else {
        btnVerde.style.color = 'white'
    }
})