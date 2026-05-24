import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export async function sendLocalNotification(
    title: string,
    body: string
) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
        },

        trigger: null,
    });
}


export async function scheduleNotification(
    title: string,
    body: string,
    seconds: number
) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
        },

        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds,
            repeats: false,
        },
    });
}