import { screenPadding } from "@/constants/tokens";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View, Image, Text } from "react-native";
import { unknownTrackImageUri } from "@/constants/images";
import { PlayerProgressBar } from "@/components/PlayerProgressbar";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle";
import { defaultStyles, utilsStyles } from "@/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { colors, fontSize } from "@/constants/tokens";
import { MovingText } from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayerControls";
import { FontAwesome } from "@expo/vector-icons";
import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import { LinearGradient } from "expo-linear-gradient";

const PlayerScreen = () => {
	const activeTrack = useActiveTrack()
	const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)
	const { top, bottom } = useSafeAreaInsets()
	const isFavorite = false

	const toggleFavorite = () => { }

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: "center" }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		);
	}
	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={imageColors ? [imageColors.dominant, imageColors.vibrant] : [colors.background]}>
			<View style={styles.overlayContainer}>
				<DismissPlayerSymbol />
				<View style={{ flex: 1, marginTop: top + 17 }}>
					<View style={styles.artworkImageContainer}>
						<Image
							source={{
								uri: typeof activeTrack.artwork === 'string' ? activeTrack.artwork : unknownTrackImageUri,
							}}
							style={styles.artworkImage}
							resizeMode="cover"
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 'auto' }}>
							<View style={{ height: 60 }}>
								<View style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>

									<View style={styles.trackTitleContainer}>

										<MovingText
											text={activeTrack.title ?? ''}
											animationThreshold={30}
											style={styles.trackTitleText} />
									</View>
									{/* Favorite button icon */}
									<FontAwesome name={isFavorite ? "heart" : "heart-o"} size={20} color={isFavorite ? colors.primary : colors.icon} style={{ marginHorizontal: 14 }} onPress={toggleFavorite} />

								</View>
								{/* Track Artist */}
								{activeTrack.artist && (
									<Text numberOfLines={1} style={[styles.trackArtistText,]}>
										{activeTrack.artist}
									</Text>
								)}
							</View>
							<PlayerProgressBar style={{ marginTop: 32 }} />
							<PlayerControls style={{ marginTop: 40 }} />


						</View>
						<PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
						<View style={utilsStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>


	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View style={{ position: 'absolute', top: top + 8, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
			<View accessible={false} style={{
				width: 50,
				height: 8, borderRadius: 8, backgroundColor: '#fff', opacity: 0.9
			}} />
		</View>
	)
}

export default PlayerScreen;

const styles = StyleSheet.create({
	artworkImageContainer: {
		paddingTop: 40,
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})
