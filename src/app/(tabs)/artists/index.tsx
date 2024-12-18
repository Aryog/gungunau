import { unknownArtistImageUri } from '@/constants/images';
import { screenPadding } from '@/constants/tokens';
import { artistNameFilter } from '@/helpers/filter';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { useEffect } from 'react';
import { defaultStyles, utilsStyles } from '@/styles';
import { colors } from '@/constants/tokens';
import { useArtists } from '@/stores/library';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import {
	FlatList,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />;
};

const ArtistsScreen = () => {
	const { search, handleOnChangeText, resetSearch, searchValue } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
		key: 'artists-screen'
	});

	const artists = useArtists();

	const filteredArtists = useMemo(() => {
		if (!searchValue) return artists;

		return artists.filter(artistNameFilter(search));
	}, [artists, searchValue]);

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
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

				<FlatList
					contentContainerStyle={{ paddingTop: 40, paddingBottom: 120 }}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListFooterComponent={ItemSeparatorComponent}
					ListEmptyComponent={
						<View>
							<Text>No artist found</Text>
							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					data={filteredArtists}
					renderItem={({ item: artist }) => (
						<Link href={`/artists/${artist.name}`} asChild>
							<TouchableHighlight activeOpacity={0.8}>
								<View style={styles.artistItemContainer}>
									<View>
										<FastImage
											source={{
												uri: unknownArtistImageUri,
												priority: FastImage.priority.normal,
											}}
											style={styles.artistImage}
										/>
									</View>
									<View style={{ width: '100%' }}>
										<Text numberOfLines={1} style={styles.artistNameText}>
											{artist.name}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</Link>
					)}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
	transparentArea: {
		height: 70,
		backgroundColor: 'transparent',
	},
	searchContainer: {
		paddingTop: 40,
		paddingBottom: 0,
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

export default ArtistsScreen;

