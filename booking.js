function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'booking.html';
        alert("Succesfully Logged In");
      } else {
        alert("user not found, login first");
        document.location.href="login.html";
      }
      // Set the flag to indicate that the function has been executed
      localStorage.setItem('loginChecked', true);
    }
  }


  (async function () {
    try {
      let loginInfo = JSON.parse(localStorage.getItem("logininfo"));
      // console.log(loginInfo.email);
  
      let url = "http://localhost:4000/bookings";
  
      let data = await fetch(url);
      let response = await data.json();
  
      // console.log(response);
  
      if (response) {
        let filteredBookings = response.filter((bookings) => bookings.userEmail === loginInfo.email).map((bookings) => {
          let passengers = bookings.passengers.map((passenger) => {
            return {
              name: `${passenger.firstName} ${passenger.lastName}`,
              age: passenger.age
            };
          });
          return {
            id: bookings.id,
            userEmail: bookings.userEmail,
            departureCity: bookings.departureCity,
            arrivalCity: bookings.arrivalCity,
            departureDate: bookings.departureDate,
            flightNumber: bookings.flightNumber,
            passengers: passengers
          };
        });
        console.log(filteredBookings);
  
        let showbookingDataElement = document.querySelector("#history");
  
        if (showbookingDataElement) {
          let historyRows = filteredBookings.map((bookings) => {
            let passengerList = bookings.passengers.map((passenger) => {
              return `${passenger.name} (${passenger.age})`;
            }).join(", ");
            return `
              <tr>
                <td>${bookings.departureCity}</td>
                <td>${bookings.arrivalCity}</td>
                <td>${bookings.departureDate}</td>
                <td>${bookings.flightNumber}</td>
                <td>${passengerList}</td>
              </tr>
            `;
          });
  
          let historyTableHtml = historyRows.join(" ");
          showbookingDataElement.innerHTML = historyTableHtml;
        } else {
          console.log("HTML element with id 'history' not found");
        }
      } else {
        console.log("No bookings data available");
      }
    } catch (error) {
      console.error(error);
    }
  })();