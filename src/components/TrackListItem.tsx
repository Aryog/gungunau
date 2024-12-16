import { unknownTrackImageUri } from "@/constants/images";
import { TouchableHighlight, View, Text, Image } from "react-native"
import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";

export type TrackListItemProps = {
	track: { title: string; image?: string, artist?: string }
}

export const TrackListItem = ({ track }: TrackListItemProps) => {
	const isActiveTrack = false;
	return (
		<TouchableHighlight>
			<View style={styles.trackItemContainer}>
				<View>
					<Image
						source={{
							uri: track.image ?? unknownTrackImageUri,
						}}
						style={[
							styles.trackArtworkImage,
							{ opacity: isActiveTrack ? 0.6 : 1 }
						]}
						resizeMode="cover"
					/>
				</View>
				<View style={{
					width: '100%'
				}}>
					<Text numberOfLines={1}
						style={[
							styles.trackTitleText,
							{ color: isActiveTrack ? colors.primary : colors.text }
						]}>
						{track.title}
					</Text>
					{track.artist && (
						<Text numberOfLines={1} style={styles.trackArtistText}>
							{track.artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
