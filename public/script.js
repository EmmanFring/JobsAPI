const myForm = document.querySelector("form");
const formLogin = document.querySelector(".formLogin");
const API_URL = "http://localhost:8000";

//register
myForm.addEventListener("submit", async function register(event) {
  event.preventDefault(); // Prevent page reload
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = { email, password };

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseJson = await response.json(); // Parse JSON response
    const token = responseJson.token;
    localStorage.setItem("token", token);
    if (!response.ok) {
      // Handle errors (e.g., duplicate email)
      throw new Error(responseJson.message || "Registration failed");
    }
    // Registration successful, redirect
    window.location.href = "welcome.html";
  } catch (error) {
    // Display error message on the page
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = error.message;
    errorMessage.style.color = "red";
    console.error("Error registering new user:", error);
  }
});

// login
formLogin.addEventListener("click", async function login(event) {
  event.preventDefault();
  try {
    email = document.querySelector("#email").value.trim();
    password = document.querySelector("#password").value.trim();
    user = { email, password };
    console.log(email, password);
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const responseJson = await response.json();
    const token = responseJson.token;
    localStorage.setItem("token", token);
    if (!response.ok) {
      throw new Error(responseJson.message || "Login failed");
    }
    window.location.href = "welcome.html";
  } catch (error) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = error.message;
    errorMessage.style.color = "red";
    console.error("Error logging in:", error);
  }
});
