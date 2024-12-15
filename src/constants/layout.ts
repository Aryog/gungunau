import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors, fontSize } from "./tokens";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor: colors.background,
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	headerTintColor: colors.text,
	headerTransparent: true,
	headerBlurEffect: 'prominent',
	headerShadowVisible: false,
	headerTitleStyle: { fontSize: fontSize.lg, fontWeight: "bold" }
}
