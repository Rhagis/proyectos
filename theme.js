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

const btnModificarDatos = document.querySelector('.btn-modificar-datos')
const formInvi = document.querySelector('.inviform')
const inputAge = document.querySelector('.age')
const inputExp = document.querySelector('.exp')
const inputGame = document.querySelector('.game')
const spanAge = document.querySelector('#edad')
const spanExp = document.querySelector('#exp')
const spanGame = document.querySelector('#game')

/** Clave única en localStorage para edad, experiencia y juegos del formulario. */
const STORAGE_FORM_DATOS = 'inviformDatos'

function guardarDatosFormularioEnLocalStorage() {
    let datos = {
        edad: inputAge ? inputAge.value : '',
        experiencia: inputExp ? inputExp.value : '',
        juegos: inputGame ? inputGame.value : ''
    }
    try {
        localStorage.setItem(STORAGE_FORM_DATOS, JSON.stringify(datos))
    } catch (e) { }
}

function aplicarDatosGuardadosALaVista(datos) {
    if (!datos) return
    if (spanAge && datos.edad !== undefined && datos.edad !== '') spanAge.textContent = datos.edad
    if (spanExp && datos.experiencia !== undefined && datos.experiencia !== '') spanExp.textContent = datos.experiencia
    if (spanGame && datos.juegos !== undefined && datos.juegos !== '') spanGame.textContent = datos.juegos
}

function cargarDatosFormularioDesdeLocalStorage() {
    try {
        let raw = localStorage.getItem(STORAGE_FORM_DATOS)
        if (!raw) return
        aplicarDatosGuardadosALaVista(JSON.parse(raw))
    } catch (e) { }
}

cargarDatosFormularioDesdeLocalStorage()

/** Solo dígitos (enteros positivos), sin espacios ni decimales. */
function esValorNumericoEntero(valor) {
    if (valor == null) return false
    return /^\d+$/.test(String(valor).trim())
}

function limpiarMensajesValidacionFormulario() {
    ;[inputAge, inputExp, inputGame].forEach(function (el) {
        if (el) el.setCustomValidity('')
    })
}

function validarFormularioSoloNumeros() {
    limpiarMensajesValidacionFormulario()
    let mensaje = 'Ingresá solo números enteros (sin letras ni decimales).'
    let ok = true
        ;[inputAge, inputExp, inputGame].forEach(function (el) {
            if (!el) return
            let v = el.value.trim()
            if (!esValorNumericoEntero(v)) {
                el.setCustomValidity(mensaje)
                ok = false
            }
        })
    return ok
}

;[inputAge, inputExp, inputGame].forEach(function (el) {
    if (!el) return
    el.addEventListener('input', function () {
        el.setCustomValidity('')
    })
})

btnModificarDatos.addEventListener('click', () => {
    inputAge.value = spanAge.textContent
    inputExp.value = spanExp.textContent
    inputGame.value = spanGame.textContent
    formInvi.classList.add('inviform--visible')
})

formInvi.addEventListener('submit', function (e) {
    e.preventDefault()
    if (!validarFormularioSoloNumeros()) {
        formInvi.reportValidity()
        return
    }
    let datosEdad = inputAge.value.trim()
    let datosExp = inputExp.value.trim()
    let datosGame = inputGame.value.trim()
    inputAge.value = datosEdad
    inputExp.value = datosExp
    inputGame.value = datosGame
    spanAge.textContent = datosEdad
    spanExp.textContent = datosExp
    spanGame.textContent = datosGame
    guardarDatosFormularioEnLocalStorage()
    limpiarMensajesValidacionFormulario()
    formInvi.classList.remove('inviform--visible')
})



