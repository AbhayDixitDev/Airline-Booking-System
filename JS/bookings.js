function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'bookings.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="index.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}

//  post booking form data start
const urlParams = new URLSearchParams(window.location.search);
const flightid =urlParams.get('flightid');
const departurecity =urlParams.get('departurecity');
const arrivalcity =  urlParams.get('arrivalcity');
console.log(flightid);
console.log(departurecity);
console.log(arrivalcity);
document.getElementById('departure-city').value = departurecity;
document.getElementById('arrival-city').value = arrivalcity;
document.getElementById('flight-number').value = flightid;


const form = document.getElementById('booking-form');
const addPassengerButton = document.getElementById('add-passenger');
const passengerInfoContainer = document.getElementById('passenger-info');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const flightNumberInput = document.getElementById('flight-number');
const departureDateInput = document.getElementById('departure-date');

let passengerCount = 1;
let passengers = [];

addPassengerButton.addEventListener('click', () => {
  const numAdults = parseInt(adultsInput.value);
  const numChildren = parseInt(childrenInput.value);
  const totalPassengers = numAdults + numChildren;

  

  for (let i = passengerCount; i <= totalPassengers; i++) {
    const newPassengerFields = `
      <div class="passenger">
        <label for="adult-${i}-first-name">Passenger ${i} First Name:</label>
        <input type="text" id="adult-${i}-first-name" name="adult-${i}-first-name"><br><br>
        <label for="adult-${i}-last-name">Passenger ${i} Last Name:</label>
        <input type="text" id="adult-${i}-last-name" name="adult-${i}-last-name"><br><br>
        <label for="adult-${i}-age">Passenger ${i} Age:</label>
        <input type="number" id="adult-${i}-age" name="adult-${i}-age"><br><br>
      </div>
    `;
    passengerInfoContainer.innerHTML += newPassengerFields;
  }

  passengerCount = totalPassengers;
});

function bookFlight(){
  const departureCity = document.getElementById('departure-city').value;
  const arrivalCity = document.getElementById('arrival-city').value;
  const departureDate = document.getElementById('departure-date').value;
  const flightNumber = document.getElementById('flight-number').value;
  const loginInfo = JSON.parse(localStorage.getItem('logininfo'));
  const userEmail = loginInfo.email;
  console.log(userEmail);

  if (!departureDate) {
    alert('Please enter the departure date');
    return;
  }

  passengers = [];
  for (let i = 1; i <= passengerCount; i++) {
    const firstName = document.getElementById(`adult-${i}-first-name`).value;
    const lastName = document.getElementById(`adult-${i}-last-name`).value;
    const age = document.getElementById(`adult-${i}-age`).value;

    if (!firstName || !lastName || !age) {
      alert('Please enter all passenger details');
      return;
    }

    passengers.push({ firstName, lastName, age });
  }

  const data = {
    departureCity,
    arrivalCity,
    departureDate,
    flightNumber,
    passengers,
    userEmail
  };

  setTimeout(() => {
    fetch('https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }, 5000); // Delay the fetch request by 1 second
};


function close(){
    window.location.replace("dashboardCustomer.html");
}





//  post booking form data end



// ShowTicket Function 

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Hide the booking form
  document.getElementById('booking-form').style.display = 'none';

  // Get the data from the form
  const departureCity = document.getElementById('departure-city').value;
  const arrivalCity = document.getElementById('arrival-city').value;
  const departureDate = document.getElementById('departure-date').value;
  const flightNumber = document.getElementById('flight-number').value;
  const passengers = [];
  for (let i = 1; i <= passengerCount; i++) {
    const firstName = document.getElementById(`adult-${i}-first-name`).value;
    const lastName = document.getElementById(`adult-${i}-last-name`).value;
    const age = document.getElementById(`adult-${i}-age`).value;
    passengers.push({ firstName, lastName, age });
  }
  const loginInfo = JSON.parse(localStorage.getItem('logininfo'));
  const userEmail = loginInfo.email;

  // Create the ticket HTML
  const ticketHTML = `
    <h3 style="color:red;">TICKET WILL DISAPPEAR AFTER 5 SECONDS</h3>
    <h2>Flight Details</h2>
    <p>Flight Number: ${flightNumber}</p>
    <p>Departure City: ${departureCity}</p>
    <p>Arrival City: ${arrivalCity}</p>
    <p>Departure Date: ${departureDate}</p>
    <h3>Passengers:</h3>
    <ul type="none">
      ${passengers.map((passenger, index) => `
        <li>Passenger ${index + 1}: ${passenger.firstName} ${passenger.lastName} (Age: ${passenger.age})</li>
      `).join('')}
    </ul>
    <p>Email: ${userEmail}</p>
  `;

  // Display the ticket
  const ticketContainerMain = document.getElementById('ticket-container-main');
  const ticketContainer = document.getElementById('ticket-container');
  ticketContainer.innerHTML = ticketHTML;
  ticketContainerMain.style.display = 'block';
  return false;
});
