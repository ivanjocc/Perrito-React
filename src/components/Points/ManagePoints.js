import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePoints = () => {
	const [user, setUser] = useState({});
	const [pointsToAdd, setPointsToAdd] = useState(0);
	const [pointsToRemove, setPointsToRemove] = useState(0);

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
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleAddPoints = () => {
		axios.put(
			'https://api.joeleprof.com/letsplay/game/wins',
			{ points: pointsToAdd },
			{
				headers: {
					Authorization: 'Bearer add token',
				},
			}
		)
			.then((response) => {
				setPointsToAdd(0);
				setSuccess('Points added successfully');
				setError(null);
			})
			.catch((err) => {
				setError('Error adding points');
				setSuccess(null);
			});
	};

	const handleRemovePoints = () => {
		axios.put(
			'https://api.joeleprof.com/letsplay/game/lost',
			{ points: pointsToRemove },
			{
				headers: {
					Authorization: 'Bearer add token',
				},
			}
		)
			.then((response) => {
				setPointsToRemove(0);
				setSuccess('Points removed successfully');
				setError(null);
			})
			.catch((err) => {
				setError('Error removing points');
				setSuccess(null);
			});
	};

	return (
		<div>
			<h2>Manage Points</h2>
			<p>Current Points: {user.points}</p>
			<div>
				<label>Add Points:</label>
				<input
					type="number"
					value={pointsToAdd}
					onChange={(e) => setPointsToAdd(parseInt(e.target.value))}
				/>
				<button onClick={handleAddPoints}>Add</button>
			</div>
			<div>
				<label>Remove Points:</label>
				<input
					type="number"
					value={pointsToRemove}
					onChange={(e) => setPointsToRemove(parseInt(e.target.value))}
				/>
				<button onClick={handleRemovePoints}>Remove</button>
			</div>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default ManagePoints;
