// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type UserDB = {
	id: number;
	username: string;
	password_hash: string;
	salt: string;
	avatar: string;
	token: string;
	oauth_spotify: string;
	oauth_spotify_refresh: string;
	oauth_spotify_expires_at: string;
	oauth_soundcloud: string;
	oauth_soundcloud_refresh: string;
	oauth_soundcloud_expires_at: string;
	settings: string;
	created_at: number;
	updated_at: number;
};

type DbPlaylist = {
	id: number;
	name: string;
	cover: string;
	public: boolean;
	user_id: number;
	avatar: string;
	username: string;
};

type DbPlaylistList = DbPlaylist[];

type DbPlaylistView = {
	meta: DbPlaylist;
	tracks: DbTrack[];
};

declare enum Service {
	Spotify = 'spotify',
	YouTube = 'youtube',
	SoundCloud = 'soundcloud',
	None = 'none'
}

type DbTrack = {
	id: number;
	playlist_id: number;
	track_id: number;
	service_type: Service;
	created_at: number;
	updated_at: number;
};

type SimplifiedAlbum = {
	id: string;
	service: Service;
	title: string;
	cover: string;
};

type SimplifiedArtist = {
	id: string;
	service: Service;
	name: string;
};

type SimplifiedTrack = {
	id: string;
	service: Service;
	title: string;
	cover: string;
	artists: SimplifiedArtist[];
	album: SimplifiedAlbum;
	duration: number;
};

type SimplifiedTrackList = SimplifiedTrack[];

type SimplifiedPlaylist = {
	id: string;
	service: Service;
	title: string;
	cover: string;
	username: string;
	avatar: string;
};

type SimplifiedPlaylistList = SimplifiedPlaylist[];

type SimplifiedPlaylistView = {
	meta: SimplifiedPlaylist;
	tracks: SimplifiedTrack[];
};

type spotifyOAuth = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
};
