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

/* =========================================================
   GLOBAL BACK TO TOP BUTTON  
========================================================= */

var backBtn = document.getElementById("backToTop");

if (backBtn) {
  backBtn.style.display = "none";

  window.addEventListener("scroll", function () {
    backBtn.style.display = (window.scrollY > 200) ? "block" : "none";
  });

  backBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================================================
    GLOBAL THEME HANDLING 
========================================================= */

// Load saved theme (from friend’s homepage)
var savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}


/* =========================
  GLOBAL SEARCH BOX
========================= */
var searchForm = document.getElementById("search-box");
if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var input = searchForm.querySelector("input[type='search']");
    if (!input) return;

    var q = input.value.trim().toLowerCase();
    if (!q) {
      alert("Please type something to search.");
      return;
    }

    var target = null;

    if (q.includes("customer") || q.includes("client") || q.includes("my requests")) {
      target = "customer-dashboard.html";
    }
    else if (q.includes("provider") || q.includes("service provider") || q.includes("provider dashboard")|| q.includes("مزود")) {
      target = "Services_Provider_Dashboard.html";
    }
    else if (q.includes("manage staff") || q.includes("staff") || q.includes("team admin")|| q.includes("موظفين")) {
      target = "ManageStaffMembers.html";
    }
    else if (q.includes("add service") || q.includes("new service")) {
      target = "Add_New_Service.html";
    }
    else if (q.includes("request") || q.includes("order") || q.includes("book")|| q.includes("طلب خدمة")) {
      target = "request-service.html";
    }
    else if (q.includes("evaluate") || q.includes("review") || q.includes("feedback")) {
      target = "evaluate-service.html";
    }
    else if (q.includes("about") || q.includes("team") || q.includes("ruqma")|| q.includes("عن") || q.includes("about us")) {
      target = "About_us_page.html";
    }
    else if (q.includes("services") || q.includes("service")) {
      target = "Services.html";
    }
    else if (q.includes("home") || q.includes("index") || q.includes("الرئيسية") || q.includes("هوم")) {
      target = "index.html";
    }
    else if (q.includes("ranem") || q.includes("ranim")|| q.includes("رنيم")) {
      target = "Ranem-Ibrahim.html";
    }
    else if (q.includes("noura") || q.includes("nora")|| q.includes("نوره")|| q.includes("نورة")) {
      target = "Noura-Alotaibi.html";
    }
    else if (q.includes("dana")||q.includes("دانه")||q.includes("دانة")) {
      target = "Dana-Alotaibi.html";
    }
    else if (q.includes("jana") || q.includes("جنى")) {
      target = "Jana-Alshehri.html";
    }

    if (target) {
      window.location.href = target;
    } else {
      alert("No matching page. Try words like 'services', 'about', 'customer', 'provider', or a team name.");
    }
  });
}


 