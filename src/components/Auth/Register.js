import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		username: '',
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://api.joeleprof.com/letsplay/auth/register', formData);
			if (response.status === 201 && response.data.token) {
				setSuccess('Registration successful');
				setError(null);
			} else {
				setError('Email is already in use');
				setSuccess(null);
			}
		} catch (err) {
			setError('Registration error');
			setSuccess(null);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
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
				<div>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
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
				<button type="submit">Register</button>
			</form>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default Register;
