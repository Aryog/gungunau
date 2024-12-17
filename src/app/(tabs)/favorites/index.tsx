import { defaultStyles } from "@/styles"
import { View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { trackTitleFilter } from "@/helpers/filter";
import { colors } from "@/constants/tokens";
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from "react-native-gesture-handler";
import { TracksList } from "@/components/TracksList";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { useFavorites } from "@/stores/library";

import { Platform } from "react-native";
const favoritesScreen = () => {

	const { search, handleOnChangeText } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favoritesTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoritesTracks

		return favoritesTracks.filter(trackTitleFilter(search))

	}, [search, favoritesTracks])
	// const filteredFavoritesTracks = () => { }

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
							<TouchableOpacity onPress={() => handleOnChangeText('')}>
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
					<TracksList tracks={filteredFavoritesTracks} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);

}
export default favoritesScreen;

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
		paddingBottom: 20,
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

