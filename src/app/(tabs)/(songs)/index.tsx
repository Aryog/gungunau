

import { TracksList } from "@/components/TracksList";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { colors } from "@/constants/tokens";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useEffect, useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/stores/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

const SongsScreen = () => {
	// Hook for search functionality (if applicable in the header)
	const { search, handleOnChangeText, resetSearch, searchValue } = useNavigationSearch({
		searchBarOptions: {
			placeholder: "Find in songs...",
		},
		key: 'songs-screen'
	});


	const tracks = useTracks()
	const validTracks = useMemo(() => {
		return tracks.filter(track => typeof track.title === 'string');
	}, [tracks]);

	const filteredTracks = useMemo(() => {

		if (!searchValue) return validTracks;
		return validTracks.filter(track => trackTitleFilter(search)(track));
	}, [searchValue, validTracks]);


	return (
		<SafeAreaView
			edges={['top', 'left', 'right']}
			style={defaultStyles.container}
		>
			{/* Wrap content in KeyboardAvoidingView */}
			<KeyboardAvoidingView
				style={styles.flexContainer}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				{/* Transparent background area before TracksList */}
				<View style={styles.transparentArea} />
				<View style={styles.searchContainer}>
					<View style={styles.searchInputWrapper}>
						{/* Search Icon */}
						<Ionicons
							name="search"
							size={20}
							color="white"
							style={styles.searchIcon}
						/>
						<TextInput
							placeholder="Find in songs..."
							placeholderTextColor={colors.textMuted}
							value={search}
							onChangeText={handleOnChangeText}
							style={styles.searchInput}
						/>
						{/* Clear Icon */}
						{search.length > 0 && (
							<TouchableOpacity onPress={() => resetSearch()}>
								<Ionicons
									name="close"
									size={20}
									color="white"
									style={styles.clearIcon}
								/>
							</TouchableOpacity>
						)}
					</View>
				</View>
				<View style={styles.content}>
					<TracksList id={generateTracksListId('songs', search)} tracks={filteredTracks} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SongsScreen;

const styles = StyleSheet.create({
	flexContainer: {
		flex: 1,
	},
	transparentArea: {
		height: 70,
		backgroundColor: 'transparent',
	},
	content: {
		flex: 1,
	},
	searchContainer: {
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	searchInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: colors.primary,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: 'white',
		paddingVertical: 10,
	},
	clearIcon: {
		marginLeft: 8,
	},
});

