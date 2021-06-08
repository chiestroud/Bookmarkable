import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../helpers/data/userData';
import UserCards from '../components/UserCards';
import UserStyle from '../styles/AdminStyle';

export default function Admin({ user }) {
  const [users, setUsers] = useState([]);

  if (user) {
    useEffect(() => {
      getUsers().then((returnedUsers) => setUsers(returnedUsers));
    }, []);
  }

  return (
    <>
      <header><h1>Admin</h1></header>
      <h2>List of Bookmarkable Users</h2>
      <UserStyle>
        {users.map((person) => (
          <UserCards
            key={person.firebaseKey}
            {...person}
          />
        ))}
      </UserStyle>
    </>
  );
}

Admin.propTypes = {
  user: PropTypes.any
};
