function toggleForms() {
  document.getElementById("registration-form").classList.toggle("hidden");
  document.getElementById("login-form").classList.toggle("hidden");
}

function registerUser() {
  let email = document.getElementById("reg-email").value;
  let password = document.getElementById("reg-password").value;
  let error = document.getElementById("reg-error");

  if (!validateEmail(email)) {
    error.textContent = "Invalid email!";
    return;
  }
  if (password.length < 6) {
    error.textContent = "Password must be at least 6 characters!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.email === email)) {
    error.textContent = "Email is already registered!";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  error.textContent = "";
  alert("Registration successful! Please login.");
  toggleForms();
}

function loginUser() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let error = document.getElementById("login-error");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.email === email);

  if (!user) {
    error.textContent = "Email not registered!";
    return;
  }
  if (user.password !== password) {
    error.textContent = "Incorrect password!";
    return;
  }

  localStorage.setItem("loggedInUser", email);
  error.textContent = "";
  window.location.href = "home.html";
}

function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
  