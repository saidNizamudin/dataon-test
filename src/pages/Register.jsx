import { faCheckCircle, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components';
import storage from '../utilities/storage';
import styles from './Register.module.css';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [validation, setValidation] = useState({});

	useEffect(() => {
		setValidation({
			usernameLength: username.length >= 8,
			usernameContainsLetter: /[a-zA-Z]/.test(username),
			emailValid: /^\S+@\S+\.\S+$/.test(email),
			passwordLength: password.length >= 8,
			passwordContainsUpperLetter: /[A-Z]/.test(password),
			passwordContainsLowerLetter: /[a-z]/.test(password),
			passwordContainsNumber: /[0-9]/.test(password),
			passwordContainsSpecialCharacter: /[@$!%*?&~]/.test(password),
			confirmationPassword: password === passwordConfirmation,
		});
	}, [username, email, password, passwordConfirmation]);

	const handleSubmit = () => {
		setLoading(true);
		const newId = uuidv4();
		const userData = storage.get('users', []);
		if (userData.some((user) => user.username === username)) {
			setTimeout(() => {
				setLoading(false);
				toast.error('Username already exists');
			}, 1000);
			return;
		} else {
			storage.set('users', [
				...userData,
				{
					id: newId,
					username: username,
					email: email,
					password: password,
				},
			]);
			setTimeout(() => {
				setLoading(false);
				toast.success('Account created successfully');
			}, 1000);
		}
	};

	return (
		<div className={styles.containerRegister}>
			<div className={styles.wrapRegister}>
				<span className={styles.title}>Create Account</span>
				<form className={styles.form}>
					<div className={styles.inputContainer}>
						<input
							className={styles.input}
							id="username"
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.usernameLength ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 8 characters in length</span>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.usernameContainsLetter ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 1 letter</span>
						</div>
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.input}
							id="email"
							type="text"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.emailValid ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Valid email format</span>
						</div>
					</div>
					<div>
						<div className={styles.inputContainer}>
							<input
								className={styles.input}
								id="password"
								placeholder="Password"
								type={isPasswordVisible ? 'text' : 'password'}
								name="pass"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<div className={styles.icon}>
								<FontAwesomeIcon
									icon={isPasswordVisible ? faEyeSlash : faEye}
									onClick={() => {
										setIsPasswordVisible(!isPasswordVisible);
									}}
								/>
							</div>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.passwordLength ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 8 characters in length</span>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.passwordContainsLowerLetter ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 1 lower case letter</span>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.passwordContainsUpperLetter ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 1 upper case letter</span>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.passwordContainsNumber ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 1 numeric character</span>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.passwordContainsSpecialCharacter ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Minimum of 1 special character @$!%*?&~</span>
						</div>
					</div>
					<div>
						<div className={styles.inputContainer}>
							<input
								className={styles.input}
								id="password-confirm"
								placeholder="Password Confirmation"
								type={isConfirmationVisible ? 'text' : 'password'}
								name="password-confirm"
								value={passwordConfirmation}
								onChange={(e) => {
									setPasswordConfirmation(e.target.value);
								}}
							/>
							<div className={styles.icon}>
								<FontAwesomeIcon
									icon={isConfirmationVisible ? faEyeSlash : faEye}
									onClick={() => {
										setIsConfirmationVisible(!isConfirmationVisible);
									}}
								/>
							</div>
						</div>
						<div className={styles.helpText}>
							<FontAwesomeIcon
								icon={faCheckCircle}
								color={validation.confirmationPassword ? '#6abab2' : '#a5aaaf'}
								className={styles.iconHelpText}
							/>
							<span>Match with password</span>
						</div>
					</div>
				</form>
				<Button
					type={Object.values(validation).includes(false) ? 'Disabled' : 'Primary'}
					clickFunction={handleSubmit}>
					{!loading ? 'Create Account' : <FontAwesomeIcon icon={faSpinner} spin />}
				</Button>
				<div className={styles.signUp}>
					<span>Already have an account?</span>
					<a className={styles.signUpLink} href="/sign-in">
						Sign In
					</a>
				</div>
			</div>
		</div>
	);
}
