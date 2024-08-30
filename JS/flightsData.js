function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'flightsData.html';
        alert("Succesfully Logged In");
      } else {
        alert("user not found, login first");
        document.location.href="index.html";
      }
      // Set the flag to indicate that the function has been executed
      localStorage.setItem('loginChecked', true);
    }
  }

  function logout(){
    localStorage.removeItem('logininfo');
    localStorage.setItem('loginChecked', 'false');
  }


  const showFlights = async () => {
    try {
      const response = await fetch('https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/flights');
      const data = await response.json();
      const flightsData = document.getElementById('flights-data');
      data.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${flight.id}</td>
          <td>${flight.airline_id}</td>
          <td>${flight.flight_number}</td>
          <td>${flight.departure_airport}</td>
          <td>${flight.arrival_airport}</td>
          <td>${flight.departure_time}</td>
          <td>${flight.arrival_time}</td>
          <td>${flight.duration}</td>
          <td>${flight.price}</td>
        `;
        flightsData.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  };



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

function updateDuration() {
  const hours = parseInt(durationHours.value);
  const minutes = parseInt(durationMinutes.value);
  const duration = hours + (minutes / 60);
}

durationHours.addEventListener('change', updateDuration);
durationMinutes.addEventListener('change', updateDuration);




//airline show function iifi
(async function () {
    let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines";
  
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
    let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airportInfo";
  
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
        let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airportInfo";
      
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
    const flightsReg = async () => {
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
    
      let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/flights";
      let method = {
        method: "POST", // Send a POST request to create a new flight
        headers: {
          "Content-Type": "application/json" // Specify the request body format as JSON
        },
        body: JSON.stringify(flightInfo) // Convert the flight data to a JSON string
      };
    
      try {
        const response = await fetch(url, method);
        const data = await response.json();
        console.log(`Flight registered successfully: ${data}`);
      } catch (error) {
        console.error(`Error registering flight: ${error}`);
      } finally {
        let container = document.querySelector(".container");
        container.style.filter = "none";
        let addFlightsForm = document.querySelector("#flight-form");
        addFlightsForm.style.display = "none";
        document.location.href = "flightsData.html";
      }
    
      return false;
    };
