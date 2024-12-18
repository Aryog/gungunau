
import { colors } from "@/constants/tokens";
import { useLayoutEffect, useState, useCallback, useMemo, useRef } from "react";
import { useNavigation } from "expo-router";
import { SearchBarProps } from "react-native-screens";

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: false,
	placeholder: "Search",
};

export const useNavigationSearch = ({
	searchBarOptions,
	key // Add a key to differentiate between different screens
}: {
	searchBarOptions?: Partial<SearchBarProps>,
	key?: string
} = {}) => {
	const searchRef = useRef("");
	const [search, setSearch] = useState("");
	const navigation = useNavigation();

	// Ensure text is always a string, even if null or undefined is passed
	const handleOnChangeText = useCallback((text: string | null | undefined) => {
		if (typeof text !== "string") {
			console.warn("Invalid input for search:", text);
			return;
		}
		searchRef.current = text;
		setSearch(text);
	}, []);

	// Memoize the search bar options to prevent unnecessary re-renders
	const mergedSearchOptions = useMemo(() => ({
		...defaultSearchOptions,
		...searchBarOptions,
		onChangeText: handleOnChangeText,
		placeholder: searchBarOptions?.placeholder || defaultSearchOptions.placeholder,
	}), [searchBarOptions, handleOnChangeText]);

	// Use a try-catch to handle potential navigation errors
	useLayoutEffect(() => {
		try {
			console.log("Setting navigation options:", mergedSearchOptions);
			navigation.setOptions({
				headerSearchBarOptions: mergedSearchOptions,
			});
		} catch (error) {
			console.warn("Failed to set navigation search options:", error);
		}
	}, [navigation, mergedSearchOptions]);

	// Reset the search when switching tabs
	useLayoutEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			searchRef.current = "";
			setSearch("");
		});
		return unsubscribe;
	}, [navigation]);

	const resetSearch = useCallback(() => {
		searchRef.current = "";
		setSearch("");
	}, []);

	return {
		search,
		handleOnChangeText,
		resetSearch,
		searchValue: searchRef.current || search || "",
	};
};

