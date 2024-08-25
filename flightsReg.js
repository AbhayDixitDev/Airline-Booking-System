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

