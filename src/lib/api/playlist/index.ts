export const playlistView = async (
	slug: string,
	token: string,
	backendUrl: string
): Promise<DbPlaylistView> => {
	const result: DbPlaylistView = {
		meta: {
			id: 0,
			name: '',
			cover: '',
			public: false,
			user_id: 0,
			avatar: '',
			username: ''
		},
		tracks: []
	};
	result.meta = await playlistMeta(slug, token, backendUrl);
	result.tracks = await playlistTracks(slug, token, backendUrl);

	return result;
};

export const playlistMeta = async (
	slug: string,
	token: string,
	backendUrl: string
): Promise<DbPlaylist> => {
	const res = await fetch(`${backendUrl}/api/playlist/${slug}`, {
		headers: {
			content_type: 'application/json',
			token: token
		}
	});
	if (res.ok) {
		return (await res.json()) as DbPlaylist;
	} else {
		throw new Error(res.statusText);
	}
};

export const playlistTracks = async (
	slug: string,
	token: string,
	backendUrl: string
): Promise<DbTrack[]> => {
	const res = await fetch(`${backendUrl}/api/playlist/${slug}/tracks`, {
		headers: {
			content_type: 'application/json',
			token: token
		}
	});
	if (res.ok) {
		return (await res.json()) as DbTrack[];
	} else {
		throw new Error(res.statusText);
	}
};
