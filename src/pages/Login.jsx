import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components';
import storage from '../utilities/storage';
import styles from './Login.module.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = () => {
		setLoading(true);
		const userData = storage.get('users', []);
		const user = userData.find((user) => user.email === email && user.password === password);
		setTimeout(() => {
			if (user) {
				setLoading(false);
				storage.set('user', user.username);
				navigate('/');
			} else {
				setLoading(false);
				toast.error('Invalid email or password');
			}
		}, 1000);
	};

	return (
		<div>
			<div className={styles.containerLogin}>
				<div className={styles.wrapLogin}>
					<div className={styles.center}>
						<span className={styles.title}>Welcome</span>
					</div>
					<form className={styles.form}>
						<div className={styles.emailInput}>
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
						</div>
						<div className={styles.passwordInput}>
							<input
								className={styles.input}
								id="password"
								placeholder="Password"
								type={isVisible ? 'text' : 'password'}
								name="pass"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<div className={styles.icon}>
								<FontAwesomeIcon
									icon={isVisible ? faEyeSlash : faEye}
									onClick={() => {
										setIsVisible(!isVisible);
									}}
								/>
							</div>
						</div>
					</form>
					<Button type="Primary" clickFunction={handleSubmit}>
						{!loading ? 'Login' : <FontAwesomeIcon icon={faSpinner} spin />}
					</Button>
					<div className={styles.signUp}>
						<span>Don’t have an account?</span>
						<a className={styles.signUpLink} href="/sign-up">
							Sign Up
						</a>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
