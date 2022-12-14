// import relevant spotify-api types from @types/spotify-api
//
// export
//
// Compare this snippet from src/lib/spotify/index.ts:
import type { SpotifyApi } from 'spotify-api';
const BASE_URL = 'https://api.spotify.com/v1';

export const getTrackBulkDetails = async (ids: number[], token: string) => {
	const res = await fetch(`${BASE_URL}/tracks?ids=${ids.join(',')}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const json = (await res.json()) as SpotifyApi.MultipleTracksResponse;

	// simplify response
	const tracks: SimplifiedTrackList = json.tracks.map((track) => ({
		id: track.id,
		title: track.name,
		service: Service.Spotify,
		artists: track.artists.map((artist) => ({
			id: artist.id,
			name: artist.name,
			service: Service.Spotify
		})),
		album: {
			id: track.album.id,
			title: track.album.name,
			cover: track.album.images[0].url,
			service: Service.Spotify
		},
		cover: track.album.images[0].url,
		duration: track.duration_ms
	}));

	return tracks;
};
