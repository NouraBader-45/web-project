// Request a Service Page JavaScript
//alert("JS file is connected!");
function validateRequest(event) {

    // Prevent form from submitting normally
    event.preventDefault();

    // ----- Get form inputs -----
    var name = document.getElementById("name").value.trim();
    var service = document.getElementById("service").value;
    var dueDate = document.getElementById("due_date").value;
    var description = document.getElementById("description").value.trim();


 // 1) Validate Full Name Must be 2 words, letters only
    var fullNamePattern = /^[A-Za-z]+\s+[A-Za-z]+$/;

    if (!fullNamePattern.test(name)) {
        alert("Please enter a valid full name (letters only, first & last name).");
        return false;
    }
	
	
    // 2) Validate Service Selection
    if (service === "") {
        alert("Please select a service.");
        return false;
    }

   

    // 3) Validate Due Date (not too soon) 3 days
   
    if (dueDate === "") {
        alert("Please select a due date.");
        return false;
    }

    var today = new Date();
    var chosenDate = new Date(dueDate);

    // Minimum: today + 3 days
    var minDate = new Date();
    minDate.setDate(today.getDate() + 3);

    if (chosenDate < minDate) {
        alert("Due date is too soon. Minimum 3 days required.");
        return false;
    }

    // 4) Validate Description (>=100 chars)
    if (description.length < 100) {
        alert("Description must be at least 100 characters.");
        return false;
    }

    // 5) Confirm Box (stay or leave)
    var userChoice = confirm(
        "Your request was sent successfully!\n\n" +
        "Click OK to stay on this page.\n" +
        "Click Cancel to return to your Dashboard."
    );

    if (userChoice) {
        // User chooses to stay Display request on page

        var container = document.getElementById("addedRequests");

        // Create a request box
        var box = document.createElement("div");
        box.className = "requestBox";

        box.innerHTML = 
            "<h3>" + service + "</h3>" +
            "<p><strong>Name:</strong> " + name + "</p>" +
            "<p><strong>Due Date:</strong> " + dueDate + "</p>" +
            "<p><strong>Description:</strong> " + description + "</p>";

        container.appendChild(box);

        // Clear form for new request
        document.getElementById("name").value = "";
        document.getElementById("service").value = "";
        document.getElementById("due_date").value = "";
        document.getElementById("description").value = "";

        return false;
    } 
    else {
        // User chooses to leave Redirect to Dashboard
        window.location.href = "customer-dashboard.html";
        return false;
    }
}

// Attach validateRequest() to the form submission (This is the same style used in your JS lectures)
window.onload = function() {
    document.querySelector("form").addEventListener("submit", validateRequest);
}
// ------------------------
// THEME SWITCHER FOR REQUEST PAGE
// ------------------------
var themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("change", function () {
        document.body.classList.toggle("lightMode");
    });
}