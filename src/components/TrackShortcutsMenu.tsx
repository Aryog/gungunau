import React, { useState } from 'react'
import { Menu } from 'react-native-paper'
import { useQueue } from '@/stores/queue'
import { useFavorites } from '@/stores/library'
import { useRouter } from 'expo-router'
import TrackPlayer, { Track } from 'react-native-track-player'
import { match } from 'ts-pattern'
import { colors } from '@/constants/tokens'
import { MaterialIcons } from '@expo/vector-icons'

type TrackShortcutsMenuProps = {
	track: Track
	children: React.ReactNode
}

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const [visible, setVisible] = useState(false)
	const router = useRouter()
	const isFavorite = track.rating === 1
	const { toggleTrackFavorite } = useFavorites()
	const { activeQueueId } = useQueue()

	const openMenu = () => setVisible(true)
	const closeMenu = () => setVisible(false)

	const handlePressAction = async (actionId: string) => {
		closeMenu()

		await match(actionId)
			.with('add-to-favorites', async () => {
				toggleTrackFavorite(track)
				if (activeQueueId?.startsWith('favorites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favorites', async () => {
				toggleTrackFavorite(track)
				if (activeQueueId?.startsWith('favorites')) {
					const queue = await TrackPlayer.getQueue()
					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)
					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn(`Unknown menu action ${actionId}`))
	}

	return (
		<Menu
			visible={visible}
			contentStyle={{ backgroundColor: colors.background }}
			onDismiss={closeMenu}
			anchor={
				<React.Fragment>
					{React.Children.map(children, child =>
						React.cloneElement(child as React.ReactElement, { onPress: openMenu })
					)}
				</React.Fragment>
			}
		>
			<Menu.Item
				title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				onPress={() => handlePressAction(isFavorite ? 'remove-from-favorites' : 'add-to-favorites')}
				leadingIcon={(iconProps) => (
					<MaterialIcons
						name={isFavorite ? 'star' : 'star-outline'}
						size={iconProps.size}
						color="white"
					/>
				)} titleStyle={{ color: 'white' }}
			/>
			<Menu.Item
				title="Add to playlist"
				onPress={() => handlePressAction('add-to-playlist')}
				leadingIcon={(iconProps) => (
					<MaterialIcons
						name="add"
						size={iconProps.size}
						color="white"
					/>
				)}
				titleStyle={{ color: 'white' }}
			/>
		</Menu>
	)
}

// Prevent "tried to register two views with the same name" error
TrackShortcutsMenu.displayName = 'TrackShortcutsMenu'
