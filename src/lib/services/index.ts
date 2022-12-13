import * as Spotify from '../spotify';

export const getTrackDetails = async (trackId: number, service: Service, token: string) => {
	switch (service) {
		case Service.Spotify:
			return await Spotify.getTrackDetails(trackId, token);
		default:
			throw new Error('Service not supported');
	}
};
