import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email.includes('@') || email.length < 5 || !email.includes('.')) {
			setErrors([
				"Must be valid Email"
			])
		} else if (username.length > 30) {
			setErrors([
				"Must have username shorter than 30 characters"
			])
		} else if (username.length < 3) {
			setErrors([
				"Must have username longer than 3 characters"
			])
		} else if (password.length < 6) {
			setErrors([
				"Password must be longer than 6 characters"
			])
		} else if (password !== confirmPassword) {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		} else if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}
	};

	return (
		<div className="signup-page">
			<div className="signuptext">
			<h1>Sign Up</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<ul className="error">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				</div>
				<div className="signup-imput">
					<label>
						Email
						<input
							type="email"
							className="sighupinput"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-imput">
					<label>
						Username
						<input
							type="text"
							className="sighupinput"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-imput">
					<label>
						Password
						<input
							type="password"
							className="sighupinput"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-imput">
					<label>
						Confirm Password
						<input
							type="password"
							className="sighupinput"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="submit-button-login">
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
