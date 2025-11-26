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

      // Empty fields
      if (!name || !price || !description) {
        alert("Please fill in all fields: name, price, and description.");
        return;
      }

      // Name cannot start with number
      if (/^[0-9]/.test(name)) {
        alert("Service name cannot start with a number.");
        nameInput.focus();
        return;
      }

      // Price must be a number
      if (isNaN(price)) {
        alert("Price must be a number.");
        priceInput.focus();
        return;
      }

      // Load existing services
      let services = JSON.parse(localStorage.getItem("services")) || [];

      // New service
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

    // No services
    if (!services.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; padding:15px;">
            No services available. Add a service first.
          </td>
        </tr>`;
      return;
    }

    // Display services
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

    /* -------------------------
         DELETE SERVICE
    --------------------------*/
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;

        if (!confirm("Delete this service?")) return;

        services = services.filter(s => s.id != id);
        localStorage.setItem("services", JSON.stringify(services));

        location.reload();
      });
    });

    /* -------------------------
           EDIT SERVICE
    --------------------------*/
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

    form.addEventListener("submit", function (event) {
      event.preventDefault();   // we’ll do our own validation

      const name      = document.getElementById("name");
      const email     = document.getElementById("email");
      const dob       = document.getElementById("dob");
      const expertise = document.getElementById("expertise");
      const skills    = document.getElementById("skills");
      const education = document.getElementById("education");
      const message   = document.getElementById("message");
      const photoInput = document.getElementById("photo");
      const photoFile  = photoInput.files[0] || null;

      // ===== 1) EMPTY FIELDS =====
      if (!name.value.trim()) {
        alert("Please enter your name.");
        name.focus();
        return;
      }
      if (!email.value.trim()) {
        alert("Please enter your email.");
        email.focus();
        return;
      }
      if (!dob.value) {
        alert("Please enter your date of birth.");
        dob.focus();
        return;
      }
      if (!expertise.value.trim()) {
        alert("Please enter your area of expertise.");
        expertise.focus();
        return;
      }
      if (!skills.value.trim()) {
        alert("Please enter your skills.");
        skills.focus();
        return;
      }
      if (!education.value.trim()) {
        alert("Please enter your education.");
        education.focus();
        return;
      }
      if (!message.value.trim()) {
        alert("Please enter your message.");
        message.focus();
        return;
      }
      if (!photoFile) {
        alert("Please upload a photo.");
        photoInput.focus();
        return;
      }

      // ===== 2) NAME CAN'T START WITH NUMBER =====
      if (/^[0-9]/.test(name.value.trim())) {
        alert("Name cannot start with a number.");
        name.focus();
        return;
      }

      // ===== 3) PHOTO MUST BE IMAGE =====
      if (!photoFile.type.startsWith("image/")) {
        alert("Photo must be an image file (JPG, PNG, etc).");
        photoInput.focus();
        return;
      }

      // ===== 4) DOB <= 2008 =====
      const year = parseInt(dob.value.split("-")[0], 10);
      if (year > 2008) {
        alert("DOB must be 2008 or earlier.");
        dob.focus();
        return;
      }

      // ===== SUCCESS =====
      alert("Thank you, " + name.value.trim() + "! Your request has been sent.");
      form.reset();
    });
  }



});
