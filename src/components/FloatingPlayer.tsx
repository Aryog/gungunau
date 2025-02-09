import { TouchableOpacity, ViewProps } from "react-native"
import { useActiveTrack } from "react-native-track-player"
import { StyleSheet } from "react-native"
import { Image, View, Text } from "react-native"
import { unknownTrackImageUri } from "@/constants/images"
import { defaultStyles } from "@/styles"
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls"
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack"
import { useRouter } from "expo-router"
import { MovingText } from "./MovingText"

export const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const displayedTrack = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		router.navigate('/player')
	}

	if (!displayedTrack) return null

	return (
		< TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<Image
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
					resizeMode="cover"
				/>
				<View style={styles.trackTitleContainer}>

					<MovingText
						style={styles.trackTitleText}
						text={displayedTrack.title ?? ''}
						animationThreshold={25}
					/>
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
