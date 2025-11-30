document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".service-container");
    let cards = Array.from(document.querySelectorAll(".service-card"));
    const select = document.getElementById("sort-choice");

    select.addEventListener("change", () => {
        let value = select.value;

        if (value === "A-Z") sortByName(true);
        else if (value === "Z-A") sortByName(false);
        else if (value === "Low-High") sortByPrice(true);
        else if (value === "High-Low") sortByPrice(false);
    });

    function sortByName(ascending = true) {
        let sorted = [...cards].sort((a, b) => {
            let A = a.querySelector(".service-name").textContent.trim().toLowerCase();
            let B = b.querySelector(".service-name").textContent.trim().toLowerCase();
            return ascending ? A.localeCompare(B) : B.localeCompare(A);
        });
        render(sorted);
    }

    function sortByPrice(ascending = true) {
        let sorted = [...cards].sort((a, b) => {
            let A = parseFloat(a.querySelector(".service-price").dataset.price);
            let B = parseFloat(b.querySelector(".service-price").dataset.price);
            return ascending ? A - B : B - A;
        });
        render(sorted);
    }

    function render(list) {
        container.innerHTML = "";
        list.forEach(card => container.appendChild(card));
    }

});

