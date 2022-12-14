import * as Spotify from '../spotify';
enum Service {
	Spotify = 'spotify',
	YouTube = 'youtube',
	SoundCloud = 'soundcloud',
	None = 'none'
}

export const getTrackBulkDetails = async (trackIds: number[], service: Service, token: string) => {
	switch (service) {
		case Service.Spotify:
			return await Spotify.getTrackBulkDetails(trackIds, token);
		default:
			throw new Error('Service not supported');
	}
};
