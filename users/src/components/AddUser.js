import React, {useState} from "react";
import axios from 'axios';

const initialUserForm = {
    name: '',
    bio: ''
}

export default function AddUser({setUsers, users}) {
    const [userForm, setUserForm] = useState(initialUserForm);

    function addUser(e) {
        // const newUser = {
        //     name: userForm.name,
        //     bio: userForm.bio
        // }
        e.preventDefault()
        axios.post('http://localhost:3300/api/users', userForm)
        .then(res => {
            console.log(res.data)
            setUsers(users.concat(res.data))
            setUserForm(initialUserForm)
        })
        .catch(err => console.log(err))
    }

    const onInputChange = e => {
        e.preventDefault()
        setUserForm({[e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={addUser} >
            <label>Name
                <input onChange={onInputChange} value={userForm.name} name='name' />
            </label><br />

            <label>Bio
                <input onChange={onInputChange} value={userForm.bio} name='bio' />
            </label><br />

            <input type='submit' />
            </form>
        </div>
    )
}