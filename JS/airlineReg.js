function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'airlineReg.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="index.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}
// show airline data
const showAirline = async () => {
  try {
    const response = await fetch('https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines');
    const data = await response.json();
    const airlinesData = document.getElementById('airlines-data');
    data.forEach(airline => {
      const row = document.createElement('tr');
      row.id = `airline-row-${airline.id}`;
      row.innerHTML = `
        <td>${airline.id}</td>
        <td>${airline.name}</td>
        <td>${airline.iata_code}</td>
        <td>${airline.country}</td>
        <td><button class="btn btn-danger" id="delete-btn-${airline.id}">Delete</button></td>
        <td><button class="btn btn-primary" id="edit-btn-${airline.id}" onclick="showEditForm(${airline.id})">Edit</button></td>
      `;
      airlinesData.appendChild(row);

      const deleteBtn = document.getElementById(`delete-btn-${airline.id}`);
      deleteBtn.addEventListener('click', () => del(airline.id));
    });
  } catch (error) {
    console.error(error);
  }
};






// airline show end
// show edit form
const showEditForm = async (id) => {
  try {
    const response = await fetch(`https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines/${id}`);
    const airline = await response.json();

    const form = document.getElementById('airline-form');
    form.style.display = 'block';

    const nameInput = document.getElementById('name');
    nameInput.value = airline.name;

    const iataCodeInput = document.getElementById('iata_code');
    iataCodeInput.value = airline.iata_code;

    const countryInput = document.getElementById('country');
    countryInput.value = airline.country;

    const formSubmitButton = document.querySelector('input[type="submit"]');
    formSubmitButton.onclick = async (event) => {
      event.preventDefault();
      await airlineReg(id, nameInput.value, iataCodeInput.value, countryInput.value);
      close();
     document.location.href="airlineReg.html";
     
      
      
    };
  } catch (error) {
    console.error(error);
  }
};

// show edit form end


  function addAirline(){

    let container=document.querySelector(".container");
    container.style.filter="blur(2px)";
    let addFlightsForm=document.querySelector("#airline-form");
    addFlightsForm.style.display="block";
}

function close(){
  let container=document.querySelector(".container");
    container.style.filter="blur(0px)";
    let addFlightsForm=document.querySelector("#airline-form");
    addFlightsForm.style.display="none";
}


const airlineReg = async (id, name, iata_code, country) => {
  try {
    if (id) {
      // Update existing airline
      const response = await fetch(`https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          iata_code,
          country
        })
      });
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        console.log('Airline updated successfully');
      } else {
        console.error('Error updating airline');
      }
    } else {
      // Create new airline
      const response = await fetch('https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          iata_code,
          country
        })
      });
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        console.log('Airline created successfully');
      } else {
        console.error('Error creating airline');
      }
    }
  } catch (error) {
    console.error(error);
  }
};


// delete code start
const del = async (id) => {
  try {
    console.log(`Deleting airline with ID ${id}`);
    const response = await fetch(`https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines/${id}`, {
      method: 'DELETE'
    });
    console.log(`Response status: ${response.status}`);
    if (response.ok) {
      console.log(`Airline with ID ${id} deleted successfully`);
      // Remove the row from the table
      const row = document.getElementById(`airline-row-${id}`);
      console.log(`Row element: ${row}`);
      row.parentNode.removeChild(row);
    } else {
      console.error(`Error deleting airline with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// delete code end


// update command start
const upd = async (id) => {
  try {
    // Get the airline data from the API
    const response = await fetch(`https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines/${id}`);
    const airlineData = await response.json();
    
    // Create a form to update the airline data
    const updateForm = document.createElement('form');
    updateForm.innerHTML = `
      <label for="name">Name:</label>
      <input type="text" id="name" value="${airlineData.name}"><br><br>
      <label for="iata_code">IATA Code:</label>
      <input type="text" id="iata_code" value="${airlineData.iata_code}"><br><br>
      <label for="country">Country:</label>
      <input type="text" id="country" value="${airlineData.country}"><br><br>
      <button type="submit">Update</button>
    `;
    
    // Add an event listener to the form to handle the update request
    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(updateForm);
      const updatedAirlineData = {
        name: formData.get('name'),
        iata_code: formData.get('iata_code'),
        country: formData.get('country')
      };
      
      try {
        const response = await fetch(`https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airlines/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedAirlineData)
        });
        if (response.ok) {
          console.log(`Airline with ID ${id} updated successfully`);
          // Update the row in the table
          const row = document.getElementById(`airline-row-${id}`);
          row.cells[1].textContent = updatedAirlineData.name;
          row.cells[2].textContent = updatedAirlineData.iata_code;
          row.cells[3].textContent = updatedAirlineData.country;
        } else {
          console.error(`Error updating airline with ID ${id}`);
        }
      } catch (error) {
        console.error(error);
      }
    });
    
    // Show the update form
    const airlinesData = document.getElementById('airlines-data');
    airlinesData.appendChild(updateForm);
  } catch (error) {
    console.error(error);
  }
};

// update command end