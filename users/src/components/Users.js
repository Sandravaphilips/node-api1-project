import React, {useEffect, useState} from 'react';
import axios from 'axios';
import User from './User';
import AddUser from './AddUser';
import styled from 'styled-components';

const UsersStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* text-align: center; */
`

export default function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3300/api/users')
        .then(response=> {
            setUsers(response.data)
        })
        .catch(err => console.log(err))
    });

    function deleteUser(id) {
        axios.delete(`http://localhost:3300/api/users/${id}`)
        .then(({data}) => console.log(data))
        .catch(err => console.log(err))
    }

    

    return (
        <UsersStyle>
            <AddUser setUsers={setUsers} users={users} />
            <div>
                {users.map(user => 
                    <User key={user.id} user={user} deleteUser={deleteUser} />
                )}
            </div> 
        </UsersStyle>
    )
}