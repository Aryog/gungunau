import { colors } from "@/constants/tokens"
import { useLayoutEffect, useState, useCallback, useMemo } from "react"
import { useNavigation } from "expo-router"
import { SearchBarProps } from "react-native-screens"

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: false,
}

export const useNavigationSearch = ({
	searchBarOptions
}: {
	searchBarOptions?: Partial<SearchBarProps>
}) => {
	const [search, setSearch] = useState('');
	const navigation = useNavigation();

	const handleOnChangeText = useCallback((text: string | null) => {
		setSearch(text ?? '');
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				...defaultSearchOptions,
				...searchBarOptions,
				onChangeText: handleOnChangeText,
			},
		});
	}, [navigation, searchBarOptions, handleOnChangeText]);

	return { search, handleOnChangeText };
}
