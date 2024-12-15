import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"
import { StackScreenWithSearchBar } from "@/constants/layout"

const favoritesScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: "Favorites" }} />
			</Stack>
		</View>
	)
}
export default favoritesScreenLayout 
