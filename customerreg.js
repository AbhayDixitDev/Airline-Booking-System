function logincredentialscheck(){
  if (!localStorage.getItem('loginChecked')) {
    if (localStorage.getItem('logininfo')) {
      // If data exists, redirect to protected page
      window.location.href = 'customerreg.html';
      alert("Succesfully Logged In");
    } else {
      alert("user not found, login first");
      document.location.href="login.html";
    }
    // Set the flag to indicate that the function has been executed
    localStorage.setItem('loginChecked', true);
  }
}



const customerreg=()=>{

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;


  const customerData = {
    "name":name,
    "email":email,
    "phone":phone,
    "address":address,
    "password":password
  };
  let url="http://localhost:4000/customers";
  let method={
    method: "POST", // Send a POST request to create a new product
    header: {
      "content-type": "application/json", // Specify the request body format as JSON
    },
    body: JSON.stringify(customerData), // Convert the product data to a JSON string
  };
  fetch(url, method);
  return false;
};