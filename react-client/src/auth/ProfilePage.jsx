import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // 2. Define the logout event handler
    async function handleLogout() {
        try {
            await logout();
            navigate('/login'); 
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    return (
        <>
            <h1>Profile</h1>
            <h2>name: {user.displayname}</h2>
            <h2>email: {user.email}</h2>
            <button onClick={handleLogout}>Log-out</button>

        </>
    );

}
export default Profile;