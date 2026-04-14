(function () {
    var STORAGE_KEY = "theme";
    var root = document.documentElement;

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* ignore */
        }
    }

    function applyTheme(theme) {
        if (theme !== "light" && theme !== "dark") theme = "light";
        root.setAttribute("data-theme", theme);
        setStoredTheme(theme);
        var btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        var label = btn.querySelector(".dark-mode__label");
        if (label) {
            label.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
        }
    }

    function initTheme() {
        var stored = getStoredTheme();
        if (stored === "light" || stored === "dark") {
            applyTheme(stored);
            return;
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            applyTheme("dark");
            return;
        }
        applyTheme("light");
    }

    function flashAnimation(button) {
        button.classList.remove("dark-mode--pulse");
        void button.offsetWidth;
        button.classList.add("dark-mode--pulse");
    }

    document.addEventListener("DOMContentLoaded", function () {
        initTheme();
        var btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.addEventListener("animationend", function (e) {
            if (e.animationName === "theme-toggle-pop") {
                btn.classList.remove("dark-mode--pulse");
            }
        });
        btn.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
            flashAnimation(btn);
        });
    });
})();
