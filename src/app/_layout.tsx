import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
			<RootNavigation />
			<StatusBar style="auto" />
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
