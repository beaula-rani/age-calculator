function calculateAge() {
    const today = new Date(); // Current date: March 06, 2025
    const birthdateInput = document.getElementById("birthdate");
    const birthdateValue = birthdateInput.value.trim();

    // Validate format
    if (!birthdateValue || !/^\d{2}-\d{2}-\d{4}$/.test(birthdateValue)) {
        alert("Invalid Date Format: Please Enter a valid date in DD-MM-YYYY format.");
        birthdateInput.value = "";
        return;
    }

    const birthdateParts = birthdateValue.split("-");
    const birthDay = parseInt(birthdateParts[0], 10);
    const birthMonth = parseInt(birthdateParts[1], 10) - 1; // JS months are 0-based
    const birthYear = parseInt(birthdateParts[2], 10);
    const birthDate = new Date(birthYear, birthMonth, birthDay);

    // Validate date
    if (isNaN(birthDate) || birthDate.getFullYear() !== birthYear ||
        birthDate.getMonth() !== birthMonth || birthDate.getDate() !== birthDay) {
        alert("Invalid Date: Please enter a valid date in DD-MM-YYYY format.");
        birthdateInput.value = "";
        return;
    }

    // Check for future date
    if (birthDate > today) {
        alert("Future Date Not Allowed: Please enter a date before " +
              today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        birthdateInput.value = "";
        return;
    }

    // Exact age calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of previous month
        days += lastMonthDate.getDate();
        months--;
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Detailed breakdowns
    const ageInMilliSeconds = today - birthDate;
    const ageInSeconds = Math.floor(ageInMilliSeconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInMonths = years * 12 + months; // Total months for display

    const resultContainer = document.getElementById("resultContainer");
    const result = document.getElementById("result");

    result.innerHTML = `
      <div class="result-item">
        <h3>Age:</h3>
        <p>${years} Years ${months} Months ${days} Days</p>
      </div>  
      <div class="result-item">
        <h3>Months Passed:</h3>
        <p>${ageInMonths}</p>
      </div> 
      <div class="result-item">
        <h3>Weeks Passed:</h3>
        <p>${ageInWeeks}</p>
      </div> 
      <div class="result-item">
        <h3>Days Passed:</h3>
        <p>${ageInDays}</p>
      </div> 
      <div class="result-item">
        <h3>Hours Passed:</h3>
        <p>${ageInHours}</p>
      </div>  
      <div class="result-item">
        <h3>Minutes Passed:</h3>
        <p>${ageInMinutes}</p>
      </div> 
      <div class="result-item">
        <h3>Seconds Passed:</h3>
        <p>${ageInSeconds}</p>
      </div> 
    `;

    resultContainer.style.display = "block";
}

document.getElementById("ageCalculator").addEventListener("submit", (event) => {
    event.preventDefault();
    calculateAge();
});