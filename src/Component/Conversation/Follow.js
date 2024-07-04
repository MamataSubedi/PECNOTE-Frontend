import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Follow() {
    const [user, setUser] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8000/api/auth/getUser")
        .then(result => {
          setUser(result.data);
        
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    return (
        <div>
            {user? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(user => (
                            <tr key="index">
                                <td>{user._id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There is no user</p>
            )}
        </div>
    );
}
