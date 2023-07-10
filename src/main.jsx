import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register } from './pages';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/sign-in" element={<Login />} />
					<Route path="/sign-up" element={<Register />} />
					<Route path="/" element={<Home />} />
				</Routes>
				<ToastContainer />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
