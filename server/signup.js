const signup = $('#signup');

signup.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  let confirm = $('#confirm').val();
  if (password !== confirm) {
    $('.message').html('Passwords do not match').attr('style', 'color: red');
  } else {
      if (username && password) {
        $.post('/signup', { username: username, password: password }).then(() => window.location = '/user/' + username);
      } 
  }
});