var form = document.querySelector('.form-inline');
var passwordInput = document.getElementById('password');
var passwordConfirmInput = document.getElementById('password-confirm');
var setPasswordButton = document.getElementById('set-password-button');
var toastsContainer = document.getElementById('toasts-container');
var toast = toastsContainer.querySelector('.toast');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  var password = passwordInput.value;
  var passwordConfirm = passwordConfirmInput.value;

  if (password === passwordConfirm) {
    // 設定新密碼的邏輯
   toast.classList.add('show');
   // 3 秒後移除 toast
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
  } else {
    alert('您輸入的密碼不一致，請重新輸入。');
  }
});
