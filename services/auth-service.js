export async function authentification(email, password) {
    try{
        return await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(async (reponse) => {
            // GESTION ERREUR + STOCKAGE VARIABLE EN SESSION STORAGE
            if (reponse.status === 200) {
                const data = await reponse.json();
                sessionStorage.setItem("userId", data.userId);
                sessionStorage.setItem("token", data.token);
                console.log("Connexion réussie");
                window.location.replace("index.html");
            } else if (reponse.status === 401) {
                // Si le mot de passe est incorrect, affiche un message d'erreur
                console.log("Mot de passe incorrect");
                return "Mot de passe incorrect";
            } else {
                // Si l'utilisateur ou le mot de passe est incorrect, affiche un message d'erreur
                console.log("Utilisateur ou mot de passe incorrect");
                return "Utilisateur ou mot de passe incorrect";
            }
        });
    }catch (e) {
        console.error('Error authentification : ', e);
    }

}