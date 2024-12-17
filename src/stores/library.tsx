import { TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from '@/assets/data/library.json'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}


export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: () => { },
	addToPlaylist: () => { }
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)


import { useMemo } from "react";

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks);
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite);

	const favorites = useMemo(
		() => tracks.filter((track) => track.rating === 1),
		[tracks] // Recalculate only when `tracks` changes
	);

	return {
		favorites,
		toggleTrackFavorite,
	};
};

