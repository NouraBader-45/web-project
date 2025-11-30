// =============================
// THEME SWITCHER (Customer Dashboard)
// =============================
var themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("change", function () {
        document.body.classList.toggle("lightMode");
    });
}