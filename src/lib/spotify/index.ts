const BASE_URL = 'https://api.spotify.com/v1';

export const getTrackDetails = async (id: number, token: string) => {
	const res = await fetch(`${BASE_URL}/tracks/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const data = await res.json();

	return data;
};
