
function loginCredentialsCheck() {
  if (!localStorage.getItem("loginChecked")) {
    if (localStorage.getItem("logininfo")) {
      // If data exists, redirect to protected page
      window.location.href = "booking.html";
      alert("Successfully Logged In");
    } else {
      alert("User not found, login first");
      document.location.href = "login.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem("loginChecked", true);
  }
}
function logout() {
  localStorage.removeItem("logininfo");
  localStorage.setItem("loginChecked", "false");
}

(async function () {
  try {
    let loginInfo = JSON.parse(localStorage.getItem("logininfo"));

    let url =
      "https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings";

    let data = await fetch(url);
    let response = await data.json();

    if (response) {
      let filteredBookings = response
        .filter((bookings) => bookings.userEmail === loginInfo.email)
        .map((bookings) => {
          let passengers = bookings.passengers.map((passenger) => {
            return {
              name: `${passenger.firstName} ${passenger.lastName}`,
              age: passenger.age,
            };
          });
          return {
            id: bookings.id,
            userEmail: bookings.userEmail,
            departureCity: bookings.departureCity,
            arrivalCity: bookings.arrivalCity,
            departureDate: bookings.departureDate,
            flightNumber: bookings.flightNumber,
            passengers: passengers,
          };
        });

      let showBookingDataElement = document.querySelector("#history");

      if (showBookingDataElement) {
        let historyRows = filteredBookings.map((bookings) => {
          let passengerList = bookings.passengers
            .map((passenger) => {
              return `${passenger.name} (${passenger.age})`;
            })
            .join(", ");
          return `
            <tr>
              <td>${bookings.departureCity}</td>
              <td>${bookings.arrivalCity}</td>
              <td>${bookings.departureDate}</td>
              <td>${bookings.flightNumber}</td>
              <td>${passengerList}</td>
              <td>
                <button class="edit-button" data-booking-id="${bookings.id}">Edit</button>
                <button class="delete-button" data-booking-id="${bookings.id}">Delete</button>
              </td>
            </tr>
          `;
        });

        let historyTableHtml = historyRows.join(" ");
        showBookingDataElement.innerHTML = `
          <table>
            <tr>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Flight Date</th>
              <th>Flight Number</th>
              <th>Passenger Details</th>
              <th>Actions</th>
            </tr>
            ${historyTableHtml}
          </table>
        `;
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

function handleEditClick(bookingId) {
  let background=document.querySelector(".container");
  background.style.filter = "blur(5px)";

  // Get the booking data from the API
  fetch(
    `https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings/${bookingId}`
  )
    .then((response) => response.json())
    .then((bookingData) => {
      // Create an edit form element
      const editForm = document.createElement("div");
      editForm.classList.add("edit-form"); // Add a class for styling
      editForm.innerHTML = `
        <h2>Edit Booking</h2>
        <form>
          <label>Departure City:</label>
          <input type="text" value="${bookingData.departureCity}" id="departureCity" />
          <br />
          <label>Arrival City:</label>
          <input type="text" value="${bookingData.arrivalCity}" id="arrivalCity" />
          <br />
          <label>Flight Date:</label>
          <input type="date" value="${bookingData.departureDate}" id="departureDate" />
          <br />
          <label>Flight Number:</label>
          <input type="text" value="${bookingData.flightNumber}" id="flightNumber" />
          <br />
          <button type="submit">Update Booking</button>

        </form>
      `;

      // Append the edit form to the body (or a specific container)
      document.body.appendChild(editForm);


      // Add an event listener to the form's submit event
      editForm.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the updated values from the form
        const updatedDepartureCity = document.getElementById("departureCity").value;
        const updatedArrivalCity = document.getElementById("arrivalCity").value;
        const updatedDepartureDate = document.getElementById("departureDate").value;
        const updatedFlightNumber = document.getElementById("flightNumber").value;



        // Make a PATCH request to the API to update the booking data
        fetch(
          `https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings/${bookingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureCity: updatedDepartureCity,
              arrivalCity: updatedArrivalCity,
              departureDate: updatedDepartureDate,
              flightNumber: updatedFlightNumber,
            }),
          }
        )
        
          .then((response) => response.json())
          .then((updatedBookingData) => {
          background.style.filter = "blur(0px)";
          form=document.querySelector(".edit-form");
          form.style.display="none";

            // console.log("Booking updated successfully!", updatedBookingData);
            // Update the table row with the new data
            const tableRow = document.querySelector(
              `#history tr[data-booking-id="${bookingId}"]`
            );
            if (tableRow) {
              tableRow.innerHTML = `
                <td>${updatedDepartureCity}</td>
                <td>${updatedArrivalCity}</td>
                <td>${updatedDepartureDate}</td>
                <td>${updatedFlightNumber}</td>
                <td>
                  <button class="edit-button" data-booking-id="${bookingId}">Edit</button>
                  <button class="delete-button" data-booking-id="${bookingId}">Delete</button>
                </td>
              `;
            }
          })
          .catch((error) => console.error(error));
      });

      // Add an event listener to close the edit form
      editForm.addEventListener("click", (event) => {
        if (event.target === editForm) {
  background.style.filter = "blur(0px)";

          editForm.remove(); // Remove the edit form when clicked outside
        }







      });
    })
    .catch((error) => console.error(error));
  }

function handleDeleteClick(bookingId) {
  // Call the deleteBooking function with the bookingId
  deleteBooking(bookingId);
}

async function deleteBooking(bookingId) {
  try {
    // Make a DELETE request to the API to delete the booking
    const response = await fetch(
      `https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings/${bookingId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // Remove the booking from the table
      const tableRow = document.querySelector(
        `#history tr[data-booking-id="${bookingId}"]`
      );
      if (tableRow) {
        tableRow.remove();
      }
      // alert("Booking deleted successfully!");
    } else {
      alert("Error deleting booking: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("history").addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const bookingId = event.target.getAttribute("data-booking-id");
    handleEditClick(bookingId);
  } else if (event.target.classList.contains("delete-button")) {
    const bookingId = event.target.getAttribute("data-booking-id");
    handleDeleteClick(bookingId);
  }
});
