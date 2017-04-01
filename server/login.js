const login = $('#login');

login.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  if (username && password) {
    $.post('/login', { username: username, password: password }).then((err) => {
      if (err) console.log(err);
      else window.location = '/profile'
  }); 
}});