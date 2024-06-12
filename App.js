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
import LoginNavigatior from "./Navigators/LoginNavigatior";

export default function App() {
    return (
            <NavigationContainer>
                <LoginNavigatior/>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
