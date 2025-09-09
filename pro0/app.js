const express = require('express');
const app = express();
const PORT = 9000;

const users = [
    {
        id: 1,
        name: "Meet",
        age: 22
    },
    {
        id: 2,
        name: "Dhruv",
        age: 20
    },
    {
        id: 3,
        name: "Himesh",
        age: 21
    },
    {
        id: 4,
        name: "Raghav",
        age: 22
    }
]

app.get('/users', (req, res) => {
    // console.log("user get api called!");
    // res.json({
    //     name: "Meet-yo",
    //     age: 22,
    // })

    res.status(200).json({
        data: users,
        // message: "User list fetched successfully!"
    })
    // res.send(users)
    console.log("User list fetched successfully!");
    
})

// fetching user using wildcard parameter
// :id => dynamic/wildcard parameter
app.get("/users/:id", (req, res) => {
    const user = users.find((u) => req.params.id == u.id)
    if (user != undefined || user != null) {
        res.status(200).json({
            data: user,
            message: "User fetched successfully!",
        })
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

app.get('/', (req, res) => {
    // res.send("Hello World from Express.js!");
    res.json({
        message: "Home Page"
    })
})

app.listen(PORT, () => {
    console.log(`Express server running at http://127.0.0.1:${PORT}`);
})