import { FlatList, FlatListProps } from "react-native"
import library from "@/assets/data/library.json"
import { TrackListItem } from "./TrackListItem"
import { utilsStyles } from "@/styles"
import { View } from "react-native"
import { screenPadding } from "@/constants/tokens"

export type TracksListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => {
	return (
		<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}>
		</View>
	)
}
export const TracksList = ({ ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={ItemDivider}
			showsVerticalScrollIndicator
			renderItem={({ item: track }: any) =>
				<TrackListItem track={{ ...track, image: track.artwork }} />
			}
			keyExtractor={(item, index) => item.title + index}
			contentContainerStyle={{ flexGrow: 1, paddingHorizontal: screenPadding.horizontal, paddingBottom: 100, paddingTop: 30 }}
			style={{ flex: 1 }}
			{...flatlistProps}
		/>
	)
}
