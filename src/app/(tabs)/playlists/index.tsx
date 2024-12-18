import { defaultStyles } from "@/styles"
import { screenPadding } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useEffect } from "react";
import { colors } from "@/constants/tokens";
import { StyleSheet } from "react-native";
import { usePlaylists } from "@/stores/library";
import { useMemo } from "react";
import { PlaylistsList } from "@/components/PlaylistsList";
import { playlistNameFilter } from "@/helpers/filter";
import { View, TouchableOpacity, TextInput } from 'react-native'
import { Playlist } from "@/helpers/types";
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from "react-native-gesture-handler";
const playlistsScreen = () => {

	const router = useRouter()

	const { search, handleOnChangeText, resetSearch, searchValue } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
		key: 'playlists-screen'
	})

	const { playlists } = usePlaylists()

	const filteredPlaylists = useMemo(() => {
		if (!searchValue) return playlists
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, searchValue])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<View style={styles.transparentArea} />
				<View style={styles.searchContainer}>
					<View style={styles.searchInputWrapper}>
						{/* Search Icon */}
						<Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
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
								<Ionicons name="close" size={20} color="white" style={styles.clearIcon} />
							</TouchableOpacity>
						)}
					</View>
				</View>

				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}
export default playlistsScreen;


const styles = StyleSheet.create({
	transparentArea: {
		height: 70,
		backgroundColor: 'transparent',
	},
	searchContainer: {
		paddingTop: 40,
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


