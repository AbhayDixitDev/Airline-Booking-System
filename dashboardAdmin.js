function logout(){
    localStorage.removeItem('logininfo');
    localStorage.setItem('loginChecked', 'false');
  }


  (function() {
    const loginInfoStorage = localStorage.getItem('logininfo');
    const loginInfo = JSON.parse(loginInfoStorage);
    const name = loginInfo.name;
    let customName = document.querySelector('#Welcome');
    customName.innerHTML = `<h2>Hello <span style="color:white; font-size:70px"> ${name} </span>, </h2><h3>Welcome to Flight Booking System</h3> `;
  })();
