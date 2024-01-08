const express = require("express");
const app = express();
const users = require("./data.json");
const fs = require("fs");

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    const html =
    `
    <ul>
        ${users.map((user) =>
            `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//REST API
app.get("/api/users", (req, res) => {
    return res.json(users);
})

// GET /api/users/1 - get user with ID 1
// GET /api/users/2 - get user with ID 2
// Dynamic Id
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userinfo = users.find((user) => user.id === id);
    res.json(userinfo);
})
 
app.post("/api/users", (req, res) => {
    //TODO: Create new User
    const body = req.body;
    // console.log("Body :" , body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./data.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Suceess" });  
    })
})


app.listen(8000,() => {
    console.log("Server Start on 8000");
});

