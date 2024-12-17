import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { playbackService } from '@/constants/playbackService'
import TrackPlayer from 'react-native-track-player'


SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => playbackService);

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded })
	useLogTrackPlayerState()
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style='light' />

			</GestureHandlerRootView>
		</SafeAreaProvider>)

}

const RootNavigation = () => {
	return (
		<Stack >
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen name='player'
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical', animationDuration: 400,
					headerShown: false
				}} />
		</Stack>
	)

}

export default App
