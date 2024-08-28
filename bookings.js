function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'bookings.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="login.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}



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

form.addEventListener('submit', (e) => {
  e.preventDefault();

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

  fetch('http://localhost:4000/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
});


function close(){
    window.location.replace("dashboardCustomer.html");
}