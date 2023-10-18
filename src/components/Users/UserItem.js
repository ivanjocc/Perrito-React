import React from 'react';

const UserItem = ({ user }) => {
	return (
		<div className="user-item">
			<h3>{user.username}</h3>
			<p>Email: {user.email}</p>
			<p>Points: {user.points}</p>
		</div>
	);
};

export default UserItem;
