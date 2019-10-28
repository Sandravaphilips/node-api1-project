// implement your API here

const express = require('express')
const cors = require('cors')
// bring in the model so we can talk to the db
const db = require('./data/db')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/users', createNewUser)
app.get('/api/users/:id', getUserById)
app.get('/api/users', getAllUsers)
app.put('/api/users/:id', updateUser)
app.delete('/api/users/:id', deleteUser)
app.get('*', handleDefaultRequest)

function createNewUser(req, res) {
  const user = {
    name: req.body.name,
    bio: req.body.bio,
    created_at: new Date(),
    updated_at: new Date()
  }

  db.insert(user)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    })
}

function getUserById(req, res) {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      console.log(data);
      res.status(200).json(data)
    })
    .error(error => {
      console.log(error);
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
    })
}

function deleteUser(req, res) {
    const { id } = req.params;
    db.remove(id)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

function updateUser (req, res) {
    const { id } = req.params;
    const userToUpdate = {
        name: req.body.name,
        bio: req.body.bio,
        created_at: new Date(),
        updated_at: new Date()
    }
    db.update(id, userToUpdate)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function handleDefaultRequest(req, res) {
  res.json('hello world')
}

app.listen(process.env.PORT || 3300, () => {
  console.log('listening on ' + (process.env.PORT || 3300));
})