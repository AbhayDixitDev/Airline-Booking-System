const dashboardCustomer = async () => {
  localStorage.setItem('loginChecked', 'true');

  try {
    const response = await fetch("https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/customers", {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#passwordCustomer");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const finddata = data.find((customer) => customer.email === email && customer.password === password);

    console.log(finddata);

    if (finddata) {
      console.log(`User found: ${JSON.stringify(finddata)}`);
      
      // Remove previous login info
      localStorage.removeItem('logininfo');
      
      // Store current login info
      localStorage.setItem('logininfo', JSON.stringify(finddata));
      
      document.location.href = "dashboardCustomer.html";
    } else {
      console.log(`User not found`);
      const retry = confirm("Your credentials are incorrect. Click 'OK' to retry or 'Cancel' to register yourself.");
      if (!retry) {
        document.location.href = "customerreg.html";
      }
    }
  } catch (error) {
    console.error(error);
    alert('Error logging in. Please try again later.');
  }

  return false; // Prevent form submission
}


  const dashboardAdmin = async () => {
    const emailInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#passwordAdmin");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (email && password) {
      fetch("https://flight-booking-json-l-git-cea0dd-abhay-dixits-projects-4f073080.vercel.app/Admin")
        .then(response => response.json())
        .then(data => {
          const finddata = data.find((user) => user.email === email && user.password === password);
  
          if (finddata) {
            console.log(`User found: ${JSON.stringify(finddata)}`);
            localStorage.setItem('logininfo', JSON.stringify(finddata));
            document.location.href = "dashboardAdmin.html";
          } else {
            console.log(`User not found`);
            const retry = confirm("Your credentials are incorrect. Click 'OK' to retry or 'Cancel' to register yourself.");
            if (!retry) {
              alert('try again with correct credentials or contact developer');
            }
          }
        })
        .catch(error => {
          console.error(error);
          alert('Error logging in. Please try again later.');
        });
    } else {
      console.log(`Invalid input`);
      alert('Please enter both email and password');
    }
  
    return false; // Prevent form submission
  }