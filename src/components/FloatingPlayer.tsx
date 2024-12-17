import { TouchableOpacity, ViewProps } from "react-native"
import { Track, useActiveTrack } from "react-native-track-player"
import { StyleSheet } from "react-native"
import { Image, View, Text } from "react-native"
import { unknownTrackImageUri } from "@/constants/images"
import { defaultStyles } from "@/styles"
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls"
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack"

export const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const displayedTrack = activeTrack ?? lastActiveTrack

	if (!displayedTrack) return null

	return (
		< TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<Image
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
					resizeMode="cover"
				/>
				<View style={styles.trackTitleContainer}>
					<Text style={styles.trackTitleText}> {displayedTrack.title} </Text>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>

			</>
		</TouchableOpacity>)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 40,
		height: 40,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	}
}
)
