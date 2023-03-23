let user = {
    "email": "string",
    "password": "string"
};

let userEntry = awaitfetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': application.json
    },
    body: JSON.stringify(userEntry)
});

let result = await userEntry.json();
alert(result.message);

