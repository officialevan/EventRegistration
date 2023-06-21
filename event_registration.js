/*
	Your Name: <Enter Your Name>
	Last Modified Date: <Enter The Date in mm/dd/yyyy format>
	File: event_registration.js
	File Description: <Enter a brief paragraph to describe the purpose of this file>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/
document.addEventListener("DOMContentLoaded", function () {
  // Countdown timer
  var timerDisplay = document.getElementById("timer");
  var minutes = 10;
  var seconds = 0;
  var countdown = setInterval(updateTimer, 1000);

  function updateTimer() {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdown);
        displayModal("Sorry, Your time to complete the form has expired. \nPlease try again later if you still wish to purchase ticket(s).");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    timerDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  // Calculate total and perform validation for number of tickets
  var numTicketsInput = document.getElementById("numTickets");
  var totalCostInput = document.getElementById("totalCost");

  numTicketsInput.addEventListener("input", calculateTotal);

  function calculateTotal() {
    var numTickets = parseInt(numTicketsInput.value);
    var errorTickets = document.getElementById("msgTickets");

    if (isNaN(numTickets) || numTickets < minTickets || numTickets > maxTickets) {
      errorTickets.textContent = "Please enter a valid number between " + minTickets + " and " + maxTickets;
      numTicketsInput.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      hideContactInformation();
    } else {
      errorTickets.textContent = "";
      numTicketsInput.style.backgroundColor = "";
      var totalCost = (numTickets * costPerTicket + ticketSurcharge).toFixed(2);
      totalCostInput.value = "$" + totalCost;
      showContactInformation();
    }
  }

  // Complete purchase and perform validation for name and email
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", completePurchase);

  function completePurchase() {
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var errorName = document.getElementById("msgname");
    var errorEmail = document.getElementById("msgemail");

    if (name === "") {
      errorName.textContent = "Please enter your name";
      nameInput.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      errorName.textContent = "";
      nameInput.style.backgroundColor = "";
    }

    if (email === "") {
      errorEmail.textContent = "Please enter your email address";
      emailInput.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      errorEmail.textContent = "";
      emailInput.style.backgroundColor = "";
    }

    if (name !== "" && email !== "") {
      var totalCost = totalCostInput.value;
      displayModal("Thank you for your purchase!\n\nTotal amount: " + totalCost + '\n\nPlease allow 24 hrs for electronic delivery');
      clearInterval(countdown);
    }
  }

  function displayModal(message) {
    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modal-content");
    var modalMessage = document.getElementById("modal-message");
    var closeButton = document.getElementById("modal-close");

    modalMessage.textContent = message;
    modal.style.display = "block";

    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function hideContactInformation() {
    var contactInformation = document.getElementById("contactInformation");
    contactInformation.style.display = "none";
  }

  function showContactInformation() {
    var contactInformation = document.getElementById("contactInformation");
    contactInformation.style.display = "block";
  }
});
