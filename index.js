const express = require("express");

const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [];

server.get("/", (req, res) => {
    res.json({ message: "hello world" });
});

server.post("/api/users", (req, res) => {
    const userInfo = req.body;

    if (userInfo.name !== undefined && userInfo.bio !== undefined) {
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
        //res.status(200).send(userInfo);
    } else if (userInfo.name === undefined && userInfo.bio === undefined) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user.",
        });
    } else {
        res.status(500).json({
            errorMessage:
                "There was an error while saving the user to the database",
        });
    }
});

server.get("/api/users", (req, res) => {
    if (users.length > 0) {
        res.status(200).json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        });
    }
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    const found = users.find((user) => user.id === id);

    if (found) {
        specificuser = users.filter((user) => user.id === id);
        res.status(200).json(found);
    } else if (!found) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        });
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved.",
        });
    }
});

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    const found = users.find((user) => user.id === id);

    if (found) {
        users = users.filter((user) => user.id !== id);

        res.status(200).json(found);
    } else if (!found) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        });
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        if (changes.name === undefined || changes.bio === undefined) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user.",
            });
        } else {
            changes.id = id;
            users[index] = changes;
            res.status(200).json(users[index]);
        }
    } else if (index === -1) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        });
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified.",
        });
    }
});

server.patch("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let found = users.find((user) => user.id === id);

    if (found) {
        if (changes.name === undefined || changes.bio === undefined) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user.",
            });
        } else {
            Object.assign(found, changes);
            res.status(200).json(found);
        }
    } else if (!found) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        });
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified.",
        });
    }
});

// server.patch("/api/users/:id", (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     let found = users.find((user) => user.id === id);

//     if (found) {
//         Object.assign(found, changes);
//         res.status(200).json(found);
//     } else {
//         res.status(404).json({ message: "user not found" });
//     }
// });

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
