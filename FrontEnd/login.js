import {authentification} from "./services/auth-service.js";

const connectButton = document.querySelector("#connect");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");

connectButton.addEventListener("click", async (event) => {
  event.preventDefault();

  try{
    if (!emailInput.value || !passwordInput.value) {
      console.log("Les champs ne sont pas remplis");
      throw new Error('Veuillez remplir tous les champs')
    }

    errorMessage.textContent = await authentification(emailInput.value, passwordInput.value);
  }catch (e){
    console.log('e', e);
    errorMessage.textContent = e.message;
  }
});

