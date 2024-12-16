import { colors } from "@/constants/tokens"
import { useLayoutEffect, useState } from "react"
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
	const [search, setSearch] = useState('')
	const navigation = useNavigation()

	const handleOnChangeText = (text: string) => {
		setSearch(text)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				...defaultSearchOptions,
				...searchBarOptions,
				onChangeText: handleOnChangeText, // directly passing the text function
			},
		})
	}, [navigation, searchBarOptions])

	return { search, handleOnChangeText }
}

