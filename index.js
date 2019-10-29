// implement your API here

const express = require('express')
const cors = require('cors')
// bring in the model so we can talk to the db
const db = require('./data/db')

const app = express()


app.use(express.json())
app.use(cors())

app.post('/api/users', createNewUser)
app.get('/api/users/:id', getUserById)
app.get('/api/users', getAllUsers)
app.put('/api/users/:id', updateUser)
app.delete('/api/users/:id', deleteUser)
app.get('*', handleDefaultRequest)

function createNewUser(req, res) {
    const user = {
        name: req.body.name,
        bio: req.body.bio
        
    }

    if (!user.name || !user.bio) {
        res.status(400).json({"errorMessage": "Please provide name and bio for the user." })
    }

    db.insert(user)
    .then(data => {
        console.log(data);
        db.findById(data.id)
        .then(data => {
        console.log(data);
        if(!data) {
            res.status(404).json({ "message": "The user with the specified ID does not exist." })
        }
      res.status(201).json(data)
    })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ "error": "There was an error while saving the user to the database" })
    })
}

function getUserById(req, res) {
    const { id } = req.params;
    
    db.findById(id)
    .then(data => {
      console.log(data);
      if(!data) {
        res.status(404).json({ "message": "The user with the specified ID does not exist." })
      }
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error);
     res.status(500).json({ "error": "The user information could not be retrieved." })
    })
}

function getAllUsers(req, res) {
    db.find()
    .then(data => {
    console.log(data)
    res.json(data)
    })
    .catch(error => {
    console.log(error)
    res.status(500).json({ "error": "The users information could not be retrieved." })
    })
}

function deleteUser(req, res) {
    const { id } = req.params;

    db.remove(id)
    .then(data => {
        console.log(data)
        if(data === 0) {
            res.status(404).json({ "message": "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ "error": "The user could not be removed" })
    })
}

function updateUser (req, res) {
    const { id } = req.params;

    const userToUpdate = {
        name: req.body.name,
        bio: req.body.bio,
        created_at: new Date(),
        updated_at: new Date()
    }

    if (!userToUpdate.name || !userToUpdate.bio) {
        res.status(400).json({"errorMessage": "Please provide name and bio for the user." })
    }

    db.update(id, userToUpdate)
    .then(data => {
        console.log(data)
        if(data === 0) {
            res.status(404).json({ "message": "The user with the specified ID does not exist." })
        }
        res.status(200).json(userToUpdate)
    })
    .catch(err => console.log(err))
}

function handleDefaultRequest(req, res) {
    res.json('hello world')
}

app.listen(process.env.PORT || 3300, () => {
    console.log('listening on ' + (process.env.PORT || 3300));
})