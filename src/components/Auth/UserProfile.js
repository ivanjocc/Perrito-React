import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
	const [user, setUser] = useState({});
	const [formData, setFormData] = useState({
		username: '',
		email: '',
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		axios.get('https://api.joeleprof.com/letsplay/me', {
			headers: {
				Authorization: 'Bearer add token',
			},
		})
			.then((response) => {
				setUser(response.data);
				setFormData({
					username: response.data.username,
					email: response.data.email,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		axios.put('https://api.joeleprof.com/letsplay/me', formData, {
			headers: {
				Authorization: 'Bearer add token',
			},
		})
			.then((response) => {
				setSuccess('Profile updated successfully');
				setError(null);
			})
			.catch((err) => {
				setError('Error updating profile');
				setSuccess(null);
			});
	};

	return (
		<div>
			<h2>User Profile</h2>
			<form onSubmit={handleUpdateProfile}>
				<div>
					<label>Username:</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit">Update Profile</button>
			</form>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default UserProfile;
