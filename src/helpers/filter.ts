import { Artist, Playlist } from "./types"
import { Track } from "react-native-track-player";

export const trackTitleFilter = (searchTerm: string | undefined) => (track: Track) => {
	// If searchTerm is undefined or empty, return true (show all tracks)
	if (!searchTerm) return true;

	// Ensure searchTerm is a string before calling toLowerCase
	const normalizedSearchTerm = String(searchTerm).toLowerCase();

	// Safely check if title exists and is a string
	const trackTitle = track?.title;
	if (!trackTitle) return false;

	return String(trackTitle).toLowerCase().includes(normalizedSearchTerm);
};

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())
