import {
    sendLocalNotification,
    scheduleNotification,
  } from '@/services/notificationService';
  
  
  export function useNotifications() {
  
    async function notify(
      title: string,
      body: string
    ) {
  
      await sendLocalNotification(
        title,
        body
      );
    }
  
  
    async function notifyLater(
      title: string,
      body: string,
      seconds: number
    ) {
  
      await scheduleNotification(
        title,
        body,
        seconds
      );
    }
  
  
    return {
      notify,
      notifyLater,
    };
  }