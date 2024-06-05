import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WaitArrowScreen from './screens/WaitArrowScreen';
import ChatScreen from './screens/ChatScreen';
import WaitCalculationScreen from './screens/WaitCalculationScreen';
import WaitInitialScreen from './screens/WaitInitialScreen';
import SignUpScreen from './screens/SingUpScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator inaitalRouteName="Start">
        <Stack.Screen
          name="Start"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitArrow"
          component={WaitArrowScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitCalculation"
          component={WaitCalculationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitInitial"
          component={WaitInitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
