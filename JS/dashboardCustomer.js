function logout(){
  localStorage.removeItem('logininfo');
  localStorage.setItem('loginChecked', 'false');
}

function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'dashboardCustomer.html';
        alert("Succesfully Logged In");
      } else {
        alert("user not found, login first");
        document.location.href="index.html";
      }
      // Set the flag to indicate that the function has been executed
      localStorage.setItem('loginChecked', true);
    }
  }

  (function() {
    const loginInfoStorage = localStorage.getItem('logininfo');
    const loginInfo = JSON.parse(loginInfoStorage);
    const name = loginInfo.name;
    let customName = document.querySelector('#Welcome');
    customName.innerHTML = `<h2>Hello <span style="color:white; font-size:70px"> ${name} </span>, </h2><h3>Welcome to Flight Booking System</h3> `;
  })();

 

