import {
	faChevronLeft,
	faPencilAlt,
	faPlusCircle,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components';
import { postCollection } from '../redux/actions/newsActions';
import storage from '../utilities/storage';
import styles from './Home.module.css';

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const [newsTitle, setNewsTitle] = useState('');
	const [newsDescription, setNewsDescription] = useState('');
	const [newsImage, setNewsImage] = useState('');
	const [author, setAuthor] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const newsList = useSelector((state) => state.news.collection);

	const handleSubmit = () => {
		setLoading(true);
		if (newsTitle === '') {
			setTimeout(() => {
				setLoading(false);
				toast.error('News Title is required');
			}, 1000);
			return;
		}
		dispatch(
			postCollection({
				id: uuidv4(),
				title: newsTitle,
				description: newsDescription,
				image: newsImage,
				author: author,
			})
		);
		setTimeout(() => {
			setLoading(false);
			setShowModal(false);
		}, 1000);
	};

	const handleOpenModal = () => {
		setShowModal(true);
		setNewsTitle('');
		setNewsDescription('');
		setNewsImage('');
	};

	useEffect(() => {
		const user = storage.get('user', '');
		if (user) {
			setAuthor(user);
		} else {
			navigate('/sign-in');
			toast.error('Please Login First');
		}
	}, []);

	const handleLogout = () => {
		storage.remove('user');
		navigate('/sign-in');
	};

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				News List
				<span className={styles.backIcon} onClick={handleLogout}>
					<FontAwesomeIcon icon={faChevronLeft} />
					Logout
				</span>
			</span>
			<div className={styles.newsListContainer}>
				{newsList.map((news) => {
					const description =
						news.description.length > 200
							? news.description.substring(0, 200) + '...'
							: news.description;
					return (
						<div className={styles.newsContainer} key={news.id}>
							<img
								className={styles.newsImage}
								src={
									news.image ||
									'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
								}
								alt="news"
							/>
							<div className={styles.newsContent}>
								<span className={styles.newsAuthor}>
									<FontAwesomeIcon icon={faPencilAlt} className={styles.authorIcon} />
									by {news.author}
								</span>
								<span className={styles.newsTitle}>{news.title}</span>
								<span className={styles.newsDescription}>
									{description || 'No Description'}
									{news.description.length > 200 && (
										<span
											className={styles.newsReadMore}
											onClick={() => {
												toast.info(news.description);
											}}>
											Read More
										</span>
									)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.postNews} onClick={handleOpenModal}>
				<FontAwesomeIcon icon={faPlusCircle} className={styles.postIcon} />
				Post News
			</div>
			<Modal visible={showModal} height="60%" width="40%" onClickAway={() => setShowModal(false)}>
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<span className={styles.modalTitle}>Form Create News</span>
						<form className={styles.form}>
							<input
								className={styles.input}
								id="newsTitle"
								type="text"
								name="newsTitle"
								placeholder="News Title"
								value={newsTitle}
								onChange={(e) => {
									setNewsTitle(e.target.value);
								}}
							/>
							<textarea
								className={styles.input}
								id="newsDescription"
								type="text"
								name="newsDescription"
								placeholder="News Description"
								value={newsDescription}
								onChange={(e) => {
									setNewsDescription(e.target.value);
								}}
							/>
							<input
								className={styles.input}
								id="newsImage"
								type="text"
								name="newsImage"
								placeholder="News Image URL"
								value={newsImage}
								onChange={(e) => {
									setNewsImage(e.target.value);
								}}
							/>
						</form>
					</div>
					<div className={styles.modalButton}>
						<Button
							type="Danger"
							clickFunction={() => {
								setShowModal(false);
							}}>
							Cancel
						</Button>
						<Button type="Primary" clickFunction={handleSubmit}>
							{!loading ? `Create` : <FontAwesomeIcon icon={faSpinner} spin />}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
