document.addEventListener("DOMContentLoaded", function () {

  const url = window.location.pathname;
  console.log("Current page:", url);

  /* ============================
        ADD NEW SERVICE PAGE
  ============================ */
  if (url.includes("Add_New_Service.html")) {

    const form = document.getElementById("serviceForm");
    const nameInput = document.getElementById("serviceName");
    const priceInput = document.getElementById("servicePrice");
    const descInput = document.getElementById("serviceDescription");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = nameInput.value.trim();
      const price = priceInput.value.trim();
      const description = descInput.value.trim();

      if (!name || !price || !description) {
        alert("Please fill in all fields: name, price, and description.");
        return;
      }

      if (/^[0-9]/.test(name)) {
        alert("Service name cannot start with a number.");
        nameInput.focus();
        return;
      }

      if (isNaN(price)) {
        alert("Price must be a number.");
        priceInput.focus();
        return;
      }

      let services = JSON.parse(localStorage.getItem("services")) || [];

      const newService = {
        id: Date.now(),
        name: name,
        price: Number(price),
        description: description
      };

      services.push(newService);
      localStorage.setItem("services", JSON.stringify(services));

      alert("New service added successfully: " + name);

      form.reset();
    });
  }

  /* ==============================
         PROVIDER DASHBOARD PAGE
  ============================== */
  if (url.includes("Services_Provider_Dashboard.html")) {

    let services = JSON.parse(localStorage.getItem("services")) || [];
    const tableBody = document.getElementById("serviceList");

    if (!services.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="no-services-row">
            No services available. Add a service first.
          </td>
        </tr>`;
      return;
    }

    services.forEach(service => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${service.name}</td>
        <td>${service.price} SAR</td>
        <td>${service.description}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${service.id}">Edit</button>
          <button class="delete-btn" data-id="${service.id}">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // DELETE
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;

        if (!confirm("Delete this service?")) return;

        services = services.filter(s => s.id != id);
        localStorage.setItem("services", JSON.stringify(services));

        location.reload();
      });
    });

    // EDIT
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        const service = services.find(s => s.id == id);

        const newName = prompt("New name:", service.name);
        const newPrice = prompt("New price:", service.price);
        const newDesc = prompt("New description:", service.description);

        if (!newName || !newPrice || !newDesc) {
          alert("All fields are required.");
          return;
        }

        if (/^[0-9]/.test(newName)) {
          alert("Name cannot start with a number.");
          return;
        }

        if (isNaN(newPrice)) {
          alert("Price must be a number.");
          return;
        }

        service.name = newName.trim();
        service.price = Number(newPrice);
        service.description = newDesc.trim();

        localStorage.setItem("services", JSON.stringify(services));
        location.reload();
      });
    });
  }

  /* ================================
       ABOUT US PAGE – JOIN FORM
  ================================ */
  if (url.includes("About_us_page.html")) {

    const form = document.querySelector(".join-form");
    if (!form) return;

    const name      = document.getElementById("name");
    const email     = document.getElementById("email");
    const dob       = document.getElementById("dob");
    const expertise = document.getElementById("expertise");
    const skills    = document.getElementById("skills");
    const education = document.getElementById("education");
    const message   = document.getElementById("message");
    const photoInput = document.querySelector("input[name='photo']");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const photoFile = photoInput.files[0] || null;

      if (!name.value.trim())       return alertAndFocus("Please enter your name.", name);
      if (!email.value.trim())      return alertAndFocus("Please enter your email.", email);
      if (!dob.value)               return alertAndFocus("Please enter your date of birth.", dob);
      if (!expertise.value.trim())  return alertAndFocus("Please enter your expertise.", expertise);
      if (!skills.value.trim())     return alertAndFocus("Please enter your skills.", skills);
      if (!education.value.trim())  return alertAndFocus("Please enter your education.", education);
      if (!message.value.trim())    return alertAndFocus("Please enter your message.", message);
      if (!photoFile)               return alertAndFocus("Please upload a photo.", photoInput);

      if (/^[0-9]/.test(name.value.trim())) {
        return alertAndFocus("Name cannot start with a number.", name);
      }

      if (!photoFile.type.startsWith("image/")) {
        return alertAndFocus("Photo must be an image file.", photoInput);
      }

      const year = parseInt(dob.value.split("-")[0]);
      if (year > 2008) {
        return alertAndFocus("DOB must be 2008 or earlier.", dob);
      }

      alert("Thank you, " + name.value.trim() + "! Your request has been sent.");
      form.reset();
    });

    function alertAndFocus(msg, field) {
      alert(msg);
      field.focus();
    }
  }

}); // END DOMContentLoaded


 