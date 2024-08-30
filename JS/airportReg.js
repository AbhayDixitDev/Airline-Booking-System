function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'airportReg.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="index.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}


const airportReg=()=>{

    const airportCode = document.getElementById('airport-code').value;
    const airportName = document.getElementById('airport-name').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

  
    const airportInfo = {
        "airportCode":airportCode,
        "airportName":airportName,
        "city":city,
        "country":country
    };
    let url="https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/airportInfo";
    let method={
      method: "POST", // Send a POST request to create a new product
      header: {
        "content-type": "application/json", // Specify the request body format as JSON
      },
      body: JSON.stringify(airportInfo), // Convert the product data to a JSON string
    };
    fetch(url, method);
    return false;
  };