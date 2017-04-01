const signup = $('#signup');

signup.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  let confirm = $('#confirm').val();
  if (username && password) {
    $.post('/signup', { username: username, password: password });
  } 
});