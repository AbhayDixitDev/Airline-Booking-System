function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'flightsData.html';
        alert("Succesfully Logged In");
      } else {
        alert("user not found, login first");
        document.location.href="login.html";
      }
      // Set the flag to indicate that the function has been executed
      localStorage.setItem('loginChecked', true);
    }
  }

  function logout(){
    localStorage.removeItem('logininfo');
    localStorage.setItem('loginChecked', 'false');
  }


fetch('http://localhost:4000/flights')
.then(response => response.json())
.then(data => {
  const flightsData = document.getElementById('flights-data');
  data.forEach(flights => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${flights.id}</td>
      <td>${flights.airline_id}</td>
      <td>${flights.flight_number}</td>
      <td>${flights.departure_airport}</td>
      <td>${flights.arrival_airport}</td>
      <td>${flights.departure_time}</td>
      <td>${flights.arrival_time}</td>
      <td>${flights.duration}</td>
      <td>${flights.price}</td>
    `;
    flightsData.appendChild(row);
  });
})
.catch(error => console.error(error));

// Add event listener to add flight button
document.getElementById('add-flight-button').addEventListener('click', () => {
// TO DO: Implement add flight functionality
// console.log('Add flight button clicked!');
});

// add flight function

function addFlight(){

    let container=document.querySelector(".container");
    container.style.filter="blur(2px)";
    let addFlightsForm=document.querySelector("#flight-form");
    addFlightsForm.style.display="block";
}

function close(){
  let container=document.querySelector(".container");
    container.style.filter="blur(0px)";
    let addFlightsForm=document.querySelector("#flight-form");
    addFlightsForm.style.display="none";
}






// post data on flights

const durationHours = document.getElementById('duration-hours');
const durationMinutes = document.getElementById('duration-minutes');
const durationValue = document.getElementById('duration-value');

durationHours.addEventListener('change', updateDuration);
durationMinutes.addEventListener('change', updateDuration);

function updateDuration() {
    const hours = parseInt(durationHours.value);
    const minutes = parseInt(durationMinutes.value);
    const duration = hours + (minutes / 60);
    durationValue.textContent = `${hours} hours ${minutes} minutes`;
}


//airline show function iifi
(async function () {
    let url = "http://localhost:4000/airlines";
  
    let data = await fetch(url);
  
    let response = await data.json();
  
    console.log(response);
  
    let showAirlineNames = document.querySelector("#airline-id");
  
    let AirlineNames = response.map((airlines) => {
      return `
         <option value="${airlines.name}">${airlines.name}</option>
        
      `;
    });
  
    showAirlineNames.innerHTML = await AirlineNames.join(" ");
  })();




  // Airport show function iifi for departure

  (async function () {
    let url = "http://localhost:4000/airportInfo";
  
    let data = await fetch(url);
  
    let response = await data.json();
  
    console.log(response);
  
    let showAirportNames = document.querySelector("#departure-airport");
  
    let AirportNames = response.map((airportInfo) => {
      return `
         <option value="${airportInfo.city}">${airportInfo.city}</option>
        
      `;
    });
  
    showAirportNames.innerHTML = await AirportNames.join(" ");
  })();

    // Airport show function iifi for arrival

    (async function () {
        let url = "http://localhost:4000/airportInfo";
      
        let data = await fetch(url);
      
        let response = await data.json();
      
        console.log(response);
      
        let showAirportNames = document.querySelector("#arrival-airport");
      
        let AirportNames = response.map((airportInfo) => {
          return `
             <option value="${airportInfo.city}">${airportInfo.city}</option>
            
          `;
        });
      
        showAirportNames.innerHTML = await AirportNames.join(" ");
      })();




    //   post data to flights data

    const flightsReg = () => {
        const airlineId = document.getElementById('airline-id').value;
        const flightNumber = document.getElementById('flight-number').value;
        const departureAirport = document.getElementById('departure-airport').value;
        const arrivalAirport = document.getElementById('arrival-airport').value;
        const departureTime = document.getElementById('departure-time').value;
        const arrivalTime = document.getElementById('arrival-time').value;
        const durationHours = document.getElementById('duration-hours').value;
        const durationMinutes = document.getElementById('duration-minutes').value;
        const price = document.getElementById('price').value;
    
        const flightInfo = {
            "airline_id": airlineId,
            "flight_number": flightNumber,
            "departure_airport": departureAirport,
            "arrival_airport": arrivalAirport,
            "departure_time": departureTime,
            "arrival_time": arrivalTime,
            "duration": `${durationHours} hours ${durationMinutes} minutes`,
            "price": price
        };
    
        let url = "http://localhost:4000/flights";
        let method = {
            method: "POST", // Send a POST request to create a new flight
            headers: {
                "Content-Type": "application/json" // Specify the request body format as JSON
            },
            body: JSON.stringify(flightInfo) // Convert the flight data to a JSON string
        };
        fetch(url, method);
        return false;
    };

