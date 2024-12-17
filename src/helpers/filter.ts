import { Artist, Playlist } from "./types"
export const trackTitleFilter = (title: string) => (track: any) => {
	console.log("Filtering track:", track); // Debugging log
	const trackTitle = track?.title;
	if (typeof trackTitle !== "string") {
		console.warn("Invalid track.title:", trackTitle); // Warn if title is undefined or not a string
		return false;
	}
	return trackTitle.toLowerCase().includes(title.toLowerCase());
};

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())
