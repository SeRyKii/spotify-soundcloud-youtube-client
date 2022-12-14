export const getUserInfo = async (token: string, backendUrl: string): Promise<UserDB> => {
	const res = await fetch(`${backendUrl}/api/user`, {
		headers: {
			content_type: 'application/json',
			token: token
		}
	});
	if (res.ok) {
		return (await res.json()) as UserDB;
	} else {
		throw new Error(res.statusText);
	}
};
