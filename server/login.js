const login = $('#login');

login.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  if (username && password) {
    $.post('/login', { username: username, password: password }).then((response) => {
      // window.location = '/profile';
      // console.log(response)
      if (response === 'Error') {
        $('.message').html('Incorrect username/password').attr('style', 'color: red');
      } else {
        console.log('Hello?');
        window.location = '/profile';
      }
  }); 
}});