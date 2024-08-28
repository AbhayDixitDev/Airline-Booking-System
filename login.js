const dashboardCustomer = async () => {
  localStorage.setItem('loginChecked', 'true');

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
      document.location.href = "dashboardCustomer.html";
      localStorage.removeItem('logininfo');      
      window.localStorage.setItem("logininfo", JSON.stringify(finddata));
      

      
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



  const dashboardAdmin = async () => {
    localStorage.setItem('loginChecked', 'true');

    let data = await fetch("http://localhost:4000/Admin");
    
    let response = await data.json();
    
    console.log(response);
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#passwordAdmin").value;
  
    let finddata = response.find(
      (e) => e.email === username && e.password === password
    );
  
    console.log(finddata);
    // return false;
    if (finddata) {
      document.location.href = "dashboardAdmin.html";

      localStorage.removeItem('logininfo');      
      window.localStorage.setItem("logininfo", JSON.stringify(finddata));

      
    } else {
      var choice = confirm(
        "Your credentials are incorrect. Click 'OK' to retry or 'Cancel' to register yourself."
      );
    
      if (choice) {
      } else {
        alert('try again with correct credentials or contact developer');
      }
    }
  
    console.log(finddata);
    return false;
  };