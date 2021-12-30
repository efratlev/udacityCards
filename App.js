import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers/index'
import middleware from './middleware'
import Constants from 'expo-constants';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";
import { handleInitialData } from './actions/index';
import { registerForPushNotificationsAsync } from './utils/helpers'

const Tab = createBottomTabNavigator()

const HomeStack = createNativeStackNavigator();

function DecksStack() {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Decks" component={DecksList} />
      <HomeStack.Screen name="Details" component={Deck} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
    </HomeStack.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
   registerForPushNotificationsAsync()
  }
  
  render() {
    return (
      <Provider store={createStore(decks, middleware)}>
        <NavigationContainer styles={styles.container}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Decks') {
                    iconName = focused
                      ? 'list-circle'
                      : 'list-outline';
                  } else if (route.name === 'Add Deck') {
                    iconName = focused ? 'add-circle' : 'add-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
              })}
          >
            <Tab.Screen name="Decks" component={DecksStack} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
