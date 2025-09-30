import React from 'react';
import LogoutButton from '../../components/common/LogoutButton';
const UserPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>User Page</h1>
            <p>Welcome to the User Page. Here you can manage your profile and view your tickets.</p>
            <LogoutButton/>
        </div>
    );
};

export default UserPage;