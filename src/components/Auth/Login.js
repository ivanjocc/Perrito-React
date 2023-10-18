import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://api.joeleprof.com/letsplay/auth/login', formData);
			if (response.status === 200 && response.data.token) {
				setSuccess('Login successful');
				setError(null);
			} else {
				setError('Incorrect credentials');
				setSuccess(null);
			}
		} catch (err) {
			setError('Authentication error');
			setSuccess(null);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
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
				<button type="submit">Login</button>
			</form>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default Login;
