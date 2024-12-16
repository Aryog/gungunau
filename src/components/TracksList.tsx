import { FlatList, FlatListProps } from "react-native"
import library from "@/assets/data/library.json"
import { TrackListItem } from "./TrackListItem"

export type TracksListProps = Partial<FlatListProps<unknown>>
export const TracksList = ({ ...flatlistProps }: TracksListProps) => {
	return <FlatList
		data={library}
		renderItem={({ item: track }: any) =>
			<TrackListItem track={{ ...track, image: track.artwork }} />
		}
		keyExtractor={(item, index) => item.title + index}
		contentContainerStyle={{ flexGrow: 1 }} // Ensures content can grow
		style={{ flex: 1 }} // Allows the list to take full available space
		{...flatlistProps}
	/>
}
