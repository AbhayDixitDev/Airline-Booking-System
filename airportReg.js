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
    let url="http://localhost:4000/airportInfo";
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