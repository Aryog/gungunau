import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />

				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>)

}

const RootNavigation = () => {
	return (
		<Stack >
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	)

}

export default App
