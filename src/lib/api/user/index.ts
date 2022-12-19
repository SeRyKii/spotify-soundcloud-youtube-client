export const getUserInfo = async (token: string, backendUrl: string): Promise<UserDB> => {
	const res = await fetch(`${backendUrl}/api/user`, {
		headers: {
			content_type: 'application/json',
			token: token
		}
	});
	if (res.ok) {
		const json = await res.json();
		if (json.error) throw new Error(json.error);
		return json as UserDB;
	} else {
		throw new Error(res.statusText);
	}
};
