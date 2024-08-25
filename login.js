const dashboardCustomer = async () => {
    let data = await fetch("http://localhost:4000/customers");
    
    let response = await data.json();
    
    console.log(response);
    
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#passwordCustomer").value;
  
    let finddata = response.find(
      (e) => e.email === email && e.password === password
    );
  
    console.log(finddata);
    // return false;
    if (finddata) {
  
      window.localStorage.setItem("logininfo", JSON.stringify(finddata));
      document.location.href = "dashboardCustomer.html";

      
    } else {
      var choice = confirm(
        "Your credentials are incorrect. Click 'OK' to retry or 'Cancel' to register yourself."
      );
    
      if (choice) {
      } else {
        document.location.href = "customerreg.html";
      }
    }
  
    console.log(finddata);
    return false;
  };