
document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     SHARED STAFF STORAGE
    
  ========================================================= */

  var STAFF_KEY = "staffMembers";

 
  var defaultMembers = [
    { name: "Ranem Ibrahim", role: "Team Leader", photo: "images/Ranem-Ibrahim.jpg" },
    { name: "Dana Alotaibi", role: "UI/UX Designer", photo: "images/Dana-Alotaibi.jpg" },
    { name: "Noura Alotaibi", role: "Web Developer", photo: "images/Noura-Alotaibi.jpg" },
    { name: "Jana Alshehri", role: "System Analyst", photo: "images/Jana-Alshehri.jpg" }
  ];

  function getMembers() {
    var saved = localStorage.getItem(STAFF_KEY);
    if (saved) return JSON.parse(saved);

   
    localStorage.setItem(STAFF_KEY, JSON.stringify(defaultMembers));
    return defaultMembers;
  }

  function saveMembers(arr) {
    localStorage.setItem(STAFF_KEY, JSON.stringify(arr));
  }

/* =========================
   Home Page Only
  
========================= */

// Back to Top
var backBtn = document.getElementById("backToTop");
if (backBtn) {
  backBtn.style.display = "none";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) backBtn.style.display = "block";
    else backBtn.style.display = "none";
  });

  backBtn.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
}

// Live Clock (header)
var clock = document.getElementById("liveClock");
if (clock) {
  function updateClock() {
    var now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }
  updateClock();
  setInterval(updateClock, 1000);
}


// Theme Toggle (global)


var savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

var toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.checked = (savedTheme === "light");

  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  });
}


  
//  GLOBAL SEARCH BOX (all pages)
// =========================
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
    else if (q.includes("provider") || q.includes("service provider") || q.includes("provider dashboard")|| q.includes("مزود") ) {
      target = "Services_Provider_Dashboard.html";
    }
    else if (q.includes("manage staff") || q.includes("staff") || q.includes("team admin")|| q.includes("موظفين") ) {
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

 

  /* =========================================================
     ABOUT US PAGE
     Render Team from localStorage
  ========================================================= */

  var teamBox =
    document.getElementById("teamContainer") ||
    document.querySelector(".team-container") ||
    document.querySelector(".team-list");

  if (teamBox) {
    var membersForAbout = getMembers();
    teamBox.innerHTML = "";

    membersForAbout.forEach(function (m) {
      var card = document.createElement("div");
      card.className = "team-member";
      card.innerHTML =
        '<img src="' + m.photo + '" alt="team photo" width="100" class="team-photo">' +
        '<p class="team-name">' + m.name + '</p>' +
        '<p class="team-role">' + (m.role || "Staff Member") + '</p>';

      teamBox.appendChild(card);
    });
  }

 
  

  /* =========================================================
     8) MANAGE STAFF MEMBERS PAGE

  ========================================================= */

  var staffList = document.getElementById("staffList");
  var deleteMembersForm = document.getElementById("deleteMembersForm");
  var deleteAllBtn = document.getElementById("deleteAllBtn");
  var addMemberForm = document.getElementById("addMemberForm");

  if (staffList && deleteMembersForm && addMemberForm) {

   function renderStaff() {
  var members = getMembers();


  console.log("renderStaff() - current members:", members);

  staffList.innerHTML = "";

  members.forEach(function (m, i) {
    var li = document.createElement("li");
    li.className = "staff-item";
    li.innerHTML =
      '<label>' +
        '<img src="' + m.photo + '" alt="Member photo" width="70" height="70">' +
        '<span class="staff-name">' + m.name + '</span>' +
        '<input type="checkbox" data-i="' + i + '">' +
      '</label>';
    staffList.appendChild(li);
  });
}


    renderStaff();

    // Delete Selected
    deleteMembersForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var checked = staffList.querySelectorAll("input[type=checkbox]:checked");
      if (checked.length === 0) {
        //  alert
        alert("Please select at least one offer.");
        return;
      }

      if (!confirm("Delete selected members?")) return;

      var members = getMembers();

      var idxs = Array.from(checked)
        .map(function (c) { return parseInt(c.dataset.i, 10); })
        .sort(function (a, b) { return b - a; });

      idxs.forEach(function (id) {
        members.splice(id, 1);
      });

      saveMembers(members);
	  console.log("After DELETE selected:", members);

      renderStaff();
    });

    // Delete All 
    if (deleteAllBtn) {
      deleteAllBtn.addEventListener("click", function (e) {
        e.preventDefault();

        var members = getMembers();
        if (members.length === 0) {
          alert("No members to delete.");
          return;
        }

        if (!confirm("Delete all members?")) return;

        saveMembers([]);
		console.log("After DELETE ALL:", getMembers());

        renderStaff();
      });
    }

    // Add Member
    addMemberForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var n = document.getElementById("nm").value.trim();
      var em = document.getElementById("em").value.trim();
      var dob = document.getElementById("dob").value;
      var sk = document.getElementById("skills").value.trim();
      var ed = document.getElementById("edu").value.trim();
      var ph = addMemberForm.querySelector('input[type="file"]')
        ? addMemberForm.querySelector('input[type="file"]').files[0]
        : null;

           var errors = [];

      if (!n || !em || !dob || !sk || !ed || !ph) {
        errors.push("- Please fill in all fields.");
      }

      if (/^\d/.test(n)) {
        errors.push("- Name cannot start with a number.");
      }

      if (ph && !ph.type.startsWith("image/")) {
        errors.push("- Photo must be an image file.");
      }

      if (dob) {
        var dobDate = new Date(dob);
        var today = new Date();

        var age = today.getFullYear() - dobDate.getFullYear();
        var m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }

        if (age < 18) {
          errors.push("- Member must be at least 18 years old.");
        }
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }


      var members = getMembers();

      members.push({
        name: n,
        role: sk, 
        photo: "images/member-placeholder.png"
      });

      saveMembers(members);
	  console.log("After ADD member:", members);

      renderStaff();
      addMemberForm.reset();

      alert("Member added successfully.");
    });
  }

});
