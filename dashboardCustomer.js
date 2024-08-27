function logincredentialscheck(){
    if (!localStorage.getItem('loginChecked')) {
      if (localStorage.getItem('logininfo')) {
        // If data exists, redirect to protected page
        window.location.href = 'dashboardCustomer.html';
        alert("Succesfully Logged In");
      } else {
        alert("user not found, login first");
        document.location.href="login.html";
      }
      // Set the flag to indicate that the function has been executed
      localStorage.setItem('loginChecked', true);
    }
  }