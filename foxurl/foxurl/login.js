async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.textContent = "";

  if (!username || !password) {
    errorBox.textContent = "Please enter both fields";
    return;
  }

  try {
    const response = await fetch("https://foxurl-database.github.io/foxurl/users.json");
    const users = await response.json();

    const user = users.find(u => u.login_username === username);

    if (!user) {
      errorBox.textContent = "Invalid username or password";
      return;
    }

    const inputHash = await sha256(password);

    if (inputHash !== user.password_hash) {
      errorBox.textContent = "Invalid username or password";
      return;
    }

    // Login success
    window.location.href = user.foxdrive_https;

  } catch (err) {
    errorBox.textContent = "Error loading user database";
  }
}
