import { FlatList, FlatListProps } from "react-native"
import library from "@/assets/data/library.json"
import { TrackListItem } from "./TrackListItem"

// Define a more specific type for your track
interface Track {
	title: string;
	artwork?: string;
	artist?: string;
}

export type TracksListProps = Partial<FlatListProps<Track>>

export const TracksList = ({ ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={library as Track[]}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						title: track.title,
						image: track.artwork,
						artist: track.artist
					}}
				/>
			)}
			keyExtractor={(item, index) => item.title + index}
			{...flatlistProps}
		/>
	)
}
