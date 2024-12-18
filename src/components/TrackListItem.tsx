import { unknownTrackImageUri } from "@/constants/images";
import { TouchableHighlight, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StopPropagation } from "./utils/StopPropagation";
import { Track, useActiveTrack } from "react-native-track-player";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useIsPlaying } from "react-native-track-player";
import LoaderKit from 'react-native-loader-kit';
import { TrackShortcutsMenu } from "@/components/TrackShortcutsMenu";

export type TrackListItemProps = {
	track: Track;
	onTrackSelect: (track: Track) => void;
};

export const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
	const isActiveTrack = useActiveTrack()?.url === track.url;
	const { playing } = useIsPlaying();

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				<View style={styles.trackImageContainer}>
					<Image
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
						}}
						style={[
							styles.trackArtworkImage,
							{ opacity: isActiveTrack ? 0.6 : 1 }
						]}
						resizeMode="cover"
					/>
					{/* Play or Pause Icon */}
					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.primary}
							/>
						) : (
							<Ionicons
								name="play"
								size={24}
								color={colors.primary}
								style={styles.trackPauseIconIndicator}
							/>
						))}
				</View>
				{/* Track Details */}
				<View style={styles.trackDetailsContainer}>
					<View style={styles.trackTextContainer}>
						<Text
							numberOfLines={1}
							style={[
								styles.trackTitleText,
								{ color: isActiveTrack ? colors.primary : colors.text },
							]}>
							{track.title}
						</Text>
						{track.artist && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>
					<StopPropagation>
						<TrackShortcutsMenu track={track}>
							<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
						</TrackShortcutsMenu>
					</StopPropagation>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: "row",
		columnGap: 14,
		alignItems: "center",
		paddingRight: 20,
	},
	trackImageContainer: {
		position: "relative",
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 16,
		width: 16,
		height: 16,
	},
	trackPauseIconIndicator: {
		position: "absolute",
		top: "50%", // Center vertically
		left: "50%", // Center horizontally
		transform: [{ translateX: -12 }, { translateY: -12 }], // Offset for centering icon
	},
	trackDetailsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	trackTextContainer: {
		width: "100%",
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: "600",
		maxWidth: "90%",
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
});

