import { colors, fontSize } from "@/constants/tokens"
import { Tabs } from "expo-router"
import { BlurView } from 'expo-blur'
import { StyleSheet } from "react-native"
import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons"
import { FloatingPlayer } from "@/components/FloatingPlayer"

const TabsNavigation = () => {
	return (
		<>
			<Tabs screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: colors.primary, tabBarLabelStyle: {
					fontSize: fontSize.xs,
					fontWeight: '500',
				},
				tabBarInactiveTintColor: colors.text,
				headerShown: false,
				tabBarStyle: {
					height: 60,
					position: 'absolute',
					borderTopLeftRadius: 15,
					borderTopRightRadius: 15,
					borderTopWidth: 0,
					paddingTop: 8,
				},
				tabBarBackground: () =>
					<BlurView
						intensity={130}
						tint="systemMaterialDark"
						style={{
							...StyleSheet.absoluteFillObject,
							overflow: 'hidden',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
					/>
			}}

			>
				<Tabs.Screen name="favorites"
					options={{
						title: "Favorites",
						tabBarIcon: ({ color }) => <FontAwesome name='heart' size={20} color={color} />
					}} />
				<Tabs.Screen name="playlists"
					options={{
						title: "Playlists",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='playlist-play' size={24} color={color} />
					}} />
				<Tabs.Screen name="(songs)"
					options={{
						title: "Songs",
						tabBarIcon: ({ color }) => <Ionicons name='musical-notes-sharp' size={24} color={color} />
					}} />
				<Tabs.Screen name="artists"
					options={{
						title: "Artists",
						tabBarIcon: ({ color }) => <FontAwesome6 name='users-line' size={20} color={color} />
					}} />
			</Tabs>
			<FloatingPlayer style={{ position: 'absolute', left: 8, right: 8, bottom: 66 }} />
		</>
	)

}
export default TabsNavigation
