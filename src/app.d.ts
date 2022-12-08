// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type Playlist = {
	id: number;
	name: string;
	cover: string;
	public: boolean;
	user_id: number;
	avatar: string;
	username: string;
};

type PlaylistList = {
	playlists: Playlist[];
};

type PlaylistView = {
	meta: Playlist;
	tracks: Track[];
};

declare enum Service {
	Spotify = 'spotify',
	YouTube = 'youtube',
	SoundCloud = 'soundcloud'
}

type Track = {
	id: number;
	playlist_id: number;
	track_id: number;
	service_type: Service;
	data: unknown;
	cover: string;
	title: string;
	created_at: number;
	updated_at: number;
};

type Album = {
	id: string;
	service: Service;
	title: string;
	cover: string;
};

type Artist = {
	id: string;
	service: Service;
	name: string;
};
