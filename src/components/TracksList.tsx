import { FlatList, FlatListProps } from "react-native"
import { TrackListItem } from "@/components/TrackListItem"
import { utilsStyles } from "@/styles"
import { View, Text, Image } from "react-native"
import { screenPadding } from "@/constants/tokens"
import TrackPlayer, { Track } from 'react-native-track-player'
import { unknownTrackImageUri } from "@/constants/images"

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => {
	return (
		<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}>
		</View>
	)
}
export const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}
	return (
		<FlatList
			data={tracks}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			showsVerticalScrollIndicator
			ListEmptyComponent={<View>
				<Text style={utilsStyles.emptyContentText}> No songs found </Text>
				<Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyContentImage} />
			</View>}
			renderItem={({ item: track }: any) =>
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			}
			contentContainerStyle={{ flexGrow: 1, paddingHorizontal: screenPadding.horizontal, paddingBottom: 100, paddingTop: 10 }}
			style={{ flex: 1 }}
			{...flatlistProps}
		/>
	)
}
