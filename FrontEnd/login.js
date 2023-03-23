const loginForm = document.querySelector("#login-form");
const connectButton = document.querySelector("#connect");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");


connectButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Vérifie que les deux champs sont remplis
  if (!emailInput.value || !passwordInput.value) {
    errorMessage.textContent = "Veuillez remplir tous les champs";
    console.log("Les champs ne sont pas remplis");
    return;
  }

  // Envoie la requête POST pour la connexion
  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value
    })
  });

  // Si la réponse est OK, stocke les informations dans le local storage
  if (reponse.ok) {
    const data = await reponse.json();
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("token", data.token);
    console.log("Connexion réussie");
    window.location.replace("index.html");
  } else if (reponse.status === 401) {
    // Si le mot de passe est incorrect, affiche un message d'erreur
    errorMessage.textContent = "Mot de passe incorrect";
    console.log("Mot de passe incorrect");
  } else {
    // Si l'utilisateur ou le mot de passe est incorrect, affiche un message d'erreur
    errorMessage.textContent = "Utilisateur ou mot de passe incorrect";
    console.log("Utilisateur ou mot de passe incorrect");
  }
});
