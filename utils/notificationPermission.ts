import * as Notifications from 'expo-notifications';

export async function requestNotificationPermissions() {

    const { status } =
        await Notifications.getPermissionsAsync();

    if (status !== 'granted') {

        const permission =
            await Notifications.requestPermissionsAsync();

        if (permission.status !== 'granted') {

            alert('Permissão negada');

            return false;
        }
    }

    return true;
}