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
console.log('Add flight button clicked!');
});

// add flight function

function addFlight(){

    let container=document.querySelector(".container");
    container.style.filter="blur(2px)";
}