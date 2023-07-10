import { toast } from 'react-toastify';
import storage from '../../utilities/storage';

const initialState = {
	collection: storage.get('newsCollection') || [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const newsReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newCollection;

	switch (type) {
		case 'POST_COLLECTION':
			newCollection = [...state.collection, payload];

			storage.set('newsCollection', newCollection);
			toast.success('News created successfully');
			return {
				...state,
				collection: newCollection,
			};

		case 'DELETE_COLLECTION':
			newCollection = state.collection.filter((item) => item.id !== payload);

			storage.set('newsCollection', newCollection);
			toast.success('News removed successfully');
			return {
				...state,
				collection: newCollection,
			};

		default:
			return state;
	}
};

export default newsReducer;
