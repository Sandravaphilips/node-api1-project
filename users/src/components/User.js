import React from 'react';
import styled from 'styled-components';

const UserStyle = styled.div`
    color: white;
    margin: 20px 0;
    border-radius: 5px;
    padding-left: 10px;
    background-color: black;
    width: 100%;
`

export default function User(props) {
    const {user, deleteUser} = props;
    const { name, bio, id } = user;

    return (
        <UserStyle>
            <p>Name: {name}</p>
            <p>Bio: {bio}</p>
            <button onClick={()=> deleteUser(id)}  >Delete</button>
        </UserStyle>
    )
}