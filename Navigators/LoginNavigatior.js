import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import WaitArrowScreen from "../screens/WaitArrowScreen";
import WaitCalculationScreen from "../screens/WaitCalculationScreen";
import WaitInitialScreen from "../screens/WaitInitialScreen";
import ChatScreen from "../screens/ChatScreen";
import SignUpScreen from "../screens/SingUpScreen";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";


import SocketTest from "../components/SocketTest";
import CalculationScreen from "../screens/CalculationScreen";

const Stack = createStackNavigator();

const LoginNavigatior = () => {
    return (
        <Stack.Navigator
            inaitalRouteName="socket"
            screenOptions={{headerShown: true}}>
            {/*inaitalRouteName : 메인 스크린 이름 지정
            screenOptions : 스크린 상단
            {변수 값} {{js 코드로 생각새줌}}
            <>jsx문법으로 return 돌려줄때도 사용
            jsx : js에서 html문법 사용하고 싶을때 js에서 사용하는것*/}
            <Stack.Screen
                name="Start"
                component={MainScreen}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="WaitArrow"
                component={WaitArrowScreen}
            />
            <Stack.Screen
                name="WaitCalculation"
                component={WaitCalculationScreen}
            />
            <Stack.Screen
                name="WaitInitial"
                component={WaitInitialScreen}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
            />
            <Stack.Screen
                name="socket"
                component={SocketTest}
            />
            <Stack.Screen
                name="calculation"
                component={CalculationScreen}
            />
        </Stack.Navigator>
    )
}

export default LoginNavigatior;