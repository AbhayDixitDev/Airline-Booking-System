function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'flightSearch.html';
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


(async function () {
    let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airportInfo";
  
    let data = await fetch(url);
  
    let response = await data.json();
  
    console.log(response);
  
    let showAirportNames = document.querySelector("#departureCity");
  
    let AirportNames = response.map((airportInfo) => {
      return `
         <option value="${airportInfo.city}">${airportInfo.city}</option>
        
      `;
    });
  
    showAirportNames.innerHTML = await AirportNames.join(" ");
  })();



(async function () {
    let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airportInfo";
  
    let data = await fetch(url);
  
    let response = await data.json();
  
    console.log(response);
  
    let showAirportNames = document.querySelector("#arrivalCity");
  
    let AirportNames = response.map((airportInfo) => {
      return `
         <option value="${airportInfo.city}">${airportInfo.city}</option>
        
      `;
    });
  
    showAirportNames.innerHTML = await AirportNames.join(" ");
  })();




  function searchFlights() {
    let url = "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/flights";
    let departureCity = document.querySelector("#departureCity").value;
    let arrivalCity = document.querySelector("#arrivalCity").value;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        let flightsResult = document.querySelector("#search-results");
        let flightsFind = data.filter(flights => flights.departure_airport === departureCity && flights.arrival_airport === arrivalCity)
          .map(flights => {
            return `
              <tr>
                <td>${flights.airline_id}</td>
                <td>${flights.flight_number}</td>
                <td>${flights.departure_airport}</td>
                <td>${flights.arrival_airport}</td>
                <td>${flights.departure_time}</td>
                <td>${flights.arrival_time}</td>
                <td>${flights.duration}</td>
                <td>${flights.price}</td>
              <td><Button type="button" onclick="return book('${flights.id}','${flights.departure_airport}','${flights.arrival_airport}')">Book</Button></td>
              </tr>
            `;
          });
  
        let flightsFindTableHtml = flightsFind.join(" ");
  
        flightsResult.innerHTML = flightsFindTableHtml;
      })
      .catch(error => {
        console.error(error);
      });
    return false;
  }

  function book(id,departcity,arrivecity) {
    document.location.href = `bookings.html?flightid=${encodeURIComponent(id)}&departurecity=${encodeURIComponent(departcity)}&arrivalcity=${encodeURIComponent(arrivecity)}`;
    return false;
  }

