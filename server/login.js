const login = $('#login');

login.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  if (username && password) {
    $.post('/login', { username: username, password: password }).then((response) => {
      if (response === 'Error') {
        $('.message').html('Incorrect username/password').attr('style', 'color: red');
      } else {
        window.location = '/user/' + username;
      }
  }); 
}});