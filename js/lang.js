let translations = {};

function setLanguage(lang) {
    if (!translations[lang]) return;

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        el.textContent = translations[lang][key] || key;
    });

    sessionStorage.setItem("lang", lang);
    // console.log("Idioma guardado por el usuario:", lang);
}

async function detectLanguage() {

    const savedLang = sessionStorage.getItem("lang");
    if (savedLang) {
        // console.log("Idioma guardado por el usuario:", savedLang);
        return savedLang;
    }

    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        console.log("IP detectada:", data.ip);
        console.log("País detectado:", data.country_name);
        console.log("Código país:", data.country_code);

        if (data.country_code === "IT") return "it";
        if (["PE", "ES", "MX", "AR", "CL", "CO"].includes(data.country_code)) return "es";

        return "en";

    } catch (error) {
        console.warn("⚠️ No se pudo detectar IP, usando navegador", error);
    }

    const browserLang = navigator.language.split("-")[0];
    return ["es", "en", "it"].includes(browserLang) ? browserLang : "es";
}

document.addEventListener("DOMContentLoaded", async () => {

    const res = await fetch("lang.json");
    translations = await res.json();

    const lang = await detectLanguage();
    setLanguage(lang);

    const selector = document.getElementById("langSwitcher");
    if (selector) {
        selector.value = lang;
        selector.addEventListener("change", function () {
            setLanguage(this.value);
        });
    }
});
