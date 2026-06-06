async function register() {
  const username = document.getElementById("username").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const foxmail = document.getElementById("foxmail").value.trim();
  const password = document.getElementById("password").value.trim();

  const errorBox = document.getElementById("error");
  const successBox = document.getElementById("success");

  errorBox.textContent = "";
  successBox.textContent = "";

  if (!username || !contact || !foxmail || !password) {
    errorBox.textContent = "Please fill in all fields";
    return;
  }

  const passwordHash = await sha256(password);

  const payload = {
    username: username,
    contact_email: contact,
    foxmail_email: foxmail,
    password_hash: passwordHash
  };

  const content = btoa(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(
      "https://api.github.com/repos/foxurl-database/foxurl-database.github.io/contents/foxurl/pending/" + username + ".json",
      {
        method: "PUT",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": "Bearer __PAT_REPLACED_AT_BUILD__",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "New registration: " + username,
          content: content
        })
      }
    );

    if (response.ok) {
      successBox.textContent = "Registration submitted! It will be processed automatically.";
    } else {
      errorBox.textContent = "Registration failed.";
    }

  } catch (err) {
    errorBox.textContent = "Error connecting to server.";
  }
}
 
