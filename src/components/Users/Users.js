import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserItem from './UserItem';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		axios.get('https://api.joeleprof.com/letsplay/users', {
			headers: {
				Authorization: 'Bearer add token',
			},
		})
			.then((response) => {
				setUsers(response.data);
			})
			.catch((err) => {
				console.error(err);
				setError('Error fetching users');
			});
	}, []);

	const handleUpdateUser = (id, newData) => {
		axios.put(`https://api.joeleprof.com/letsplay/users/${id}`, newData, {
			headers: {
				Authorization: 'Bearer add toekn',
			},
		})
			.then((response) => {
				setSuccess('User updated successfully');
				setError(null);
			})
			.catch((err) => {
				setError('Error updating user');
				setSuccess(null);
			});
	};

	const handleDeleteUser = (id) => {
		axios.delete(`https://api.joeleprof.com/letsplay/users/${id}`, {
			headers: {
				Authorization: 'Bearer add token',
			},
		})
			.then((response) => {
				setUsers(users.filter(user => user.id !== id));
				setSuccess('User deleted successfully');
				setError(null);
			})
			.catch((err) => {
				setError('Error deleting user');
				setSuccess(null);
			});
	};

	return (
		<div>
			<h2>Users</h2>
			{users.map((user) => (
				<UserItem key={user.id} user={user} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
			))}
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default Users;
