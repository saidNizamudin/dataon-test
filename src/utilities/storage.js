const storage = {
	get: (key, _default) => {
		try {
			const data = JSON.parse(localStorage.getItem(key) || 'null');
			if (data == null) {
				return _default || undefined;
			}
			return data;
		} catch (error) {
			return _default || undefined;
		}
	},
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
		return localStorage.getItem(key);
	},
	remove: (key) => {
		localStorage.removeItem(key);
	},
	clear: () => {
		localStorage.clear();
	},
};

export default storage;
