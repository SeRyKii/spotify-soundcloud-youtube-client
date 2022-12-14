export const ms_to_time = (ms: number) => {
	// convert ms to m:ss
	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);
	return `${minutes}:${seconds.padStart(2, '0')}`;
};
