function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'passengers.html';
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



(function findCommonPassengers() {
    const url = 'https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/bookings';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const bookingsData = data;
        const loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        const userEmail = loginInfo.email;
  
        const passengerNames = {};
  
        // iterate through each booking and extract passenger names
        bookingsData.forEach(bookings => {
          if (bookings.userEmail === userEmail) {
            bookings.passengers.forEach(passengers => {
              const fullName = `${passengers.firstName} ${passengers.lastName}`;
              if (!passengerNames[fullName]) {
                passengerNames[fullName] = 1;
              } else {
                passengerNames[fullName]++;
              }
            });
          }
        });
  
        // find common passenger names (e.g., names that appear more than once)
        const commonPassengers = Object.entries(passengerNames).filter(([name, count]) => count >= 1);
  
        // create a table to display the common passenger names
        const tableHtml = `
            <thead>
              <tr>
                <th>Passenger Name</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              ${commonPassengers.map(([name, count]) => `
                <tr>
                  <td>${name}</td>
                  <td>${count}</td>
                </tr>
              `).join('')}
            </tbody>
        `;
  
        // display the table
        const tableContainer = document.getElementById('common-passengers-table');
        tableContainer.innerHTML = tableHtml;
      });
  })();