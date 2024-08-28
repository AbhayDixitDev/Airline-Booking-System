function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'airlineReg.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="login.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}

const airlineReg=()=>{

    const name = document.getElementById('name').value;
    const iata_code = document.getElementById('iata_code').value;
    const country = document.getElementById('country').value;

  
    const AirlineData = {
      "name":name,
      "iata_code":iata_code,
      "country":country
    };
    let url="http://localhost:4000/airlines";
    let method={
      method: "POST", // Send a POST request to create a new product
      header: {
        "content-type": "application/json", // Specify the request body format as JSON
      },
      body: JSON.stringify(AirlineData), // Convert the product data to a JSON string
    };
    fetch(url, method);
    return false;
  };