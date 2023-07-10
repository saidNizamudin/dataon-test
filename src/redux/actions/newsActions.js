export const postCollection = (payload) => ({
	type: 'POST_COLLECTION',
	payload,
});

export const deleteCollection = (payload) => ({
	type: 'DELETE_COLLECTION',
	payload,
});
