import { FlatList, FlatListProps } from "react-native"
import { TrackListItem } from "@/components/TrackListItem"
import { utilsStyles } from "@/styles"
import { View, Text, Image } from "react-native"
import { useRef } from "react"
import { useQueue } from "@/stores/queue"
import { screenPadding } from "@/constants/tokens"
import TrackPlayer, { Track } from 'react-native-track-player'
import { unknownTrackImageUri } from "@/constants/images"
import { QueueControls } from "./QueueControls"

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string,
	tracks: Track[]
	hideQueueControls?: boolean
}

const ItemDivider = () => {
	return (
		<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}>
		</View>
	)
}
export const TracksList = ({ id, tracks, hideQueueControls = false, ...flatlistProps }: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return;


		// Within the screen
		const isChangingQueue = id !== activeQueueId
		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()

			// Construct new queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex = trackIndex - queueOffset.current < 0 ? tracks.length + trackIndex - queueOffset.current : trackIndex - queueOffset.current
			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}
	return (
		<FlatList
			data={tracks}
			ItemSeparatorComponent={ItemDivider}
			ListHeaderComponent={!hideQueueControls ? <QueueControls tracks={tracks} style={{ paddingBottom: 10 }} /> : undefined}
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
