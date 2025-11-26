// Service Evaluation Page JavaScript

function validateEvaluation(event) {
    // Prevent form from submitting normally
    event.preventDefault();
    // 1) Get form inputs
    var service = document.getElementById("service").value;
    var feedback = document.getElementById("feedback").value.trim();

    // Get selected rating (radio buttons)
    var ratingInputs = document.getElementsByName("rating");
    var ratingValue = ""; // will stay "" if nothing selected

    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            ratingValue = ratingInputs[i].value;
            break;
        }
    }

    // 2) Validate: service selected
    if (service === "") {
        alert("Please select a service to evaluate.");
        return false;
    }

    // 3) Validate: rating is chosen
    if (ratingValue === "") {
        alert("Please rate this service (select a star).");
        return false;
    }
    // 4) Validate: feedback not empty
    if (feedback === "") {
        alert("Please write your feedback.");
        return false;
    }

    // 5) Form is valid → check rating
    //    Define 'good rating' as 4 or 5 stars
    var numericRating = parseInt(ratingValue);

    if (numericRating >= 4) {
        alert("Thank you for your positive feedback! 🌟");
    } else {
        alert("Thank you for your feedback. We are sorry the service did not meet your expectations.");
    }

    // 6) Transfer customer to dashboard
    //    (No need to store the review)
    window.location.href = "customer-dashboard.html";

    return false;
}