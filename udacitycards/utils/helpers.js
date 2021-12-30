import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native'
import {Decks} from './_DATA'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';

export const DECKS_STORAGE_KEY = 'UdacityCards:decks'
const NOTIFICATION_KEY = 'UdacityCards:notifications'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecksResults)
}

function setData () {  
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(Decks))

  return Decks;
}

function formatDecksResults (results) {
  return results === null
    ? setData()
    : JSON.parse(results)
}

export function addDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function addCardToDeck (deckId, question) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const decks = {
        ...data,
        [deckId]:{
          ...data[deckId],
          questions:data[deckId].questions.concat([question])
        }
      }
      
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  }) 
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
      title: "Complete a quiz!",
      body: "👋 don't forget to complete a quiz today!"
  }
}

async function schedulePushNotification() {
  let trigger = new Date()
  trigger.setDate(trigger.getDate() + 1)
  trigger.setHours(10)
  trigger.setMintutes(0)

  await Notifications.scheduleNotificationAsync({
    content: createNotification(),
    trigger,
    repeats: true,
  });
}

export async function registerForPushNotificationsAsync() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            //alert('Failed to get push token for push notification!');
            return;
          }
          token = (Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        schedulePushNotification()

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(token));
    }
  })
}