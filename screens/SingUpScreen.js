import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipAdress from "../configs/ipAdress.json";

const SignUpScreen = (props) => {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');

    const handleSignUp = async () => {
        try {
            //TODO 하드코딩 바꿔야함
            //들어 오는 값 검증
            //post 방식에 /api/users, body에 json형식으로 nickname, gender, age(integer), location
            const response = await axios.post(`${ipAdress.ngrokServerAdress}/users`, {
                nickname,
                gender,
                age: parseInt(age),
                location:"40.7127:-74.0060",
            });

            // 회원가입이 성공하면 사용자 정보를 저장하고 홈 화면으로 이동
            console.log(`nickname : ${nickname}, response.data.nickname : ${response.data.nickname} : type : ${typeof(response.data.nickname)}`)
            if (nickname === String(response.data.nickname)) {
            //TODO 서버 회원가입 반환시 userToken 해결할것 nono,소셜 로그인 할때 하기
                await AsyncStorage.setItem('nickname', nickname);
                Alert.alert('Sign Up Success', `Welcome, ${nickname}!`);
                props.navigation.navigate('Login');

            } else {
                Alert.alert('Sign Up Failed', response.data.message || 'An error occurred during sign up.');
                props.navigation.navigate('SignUp');
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Sign Up Error', 'An error occurred while trying to sign up. Please try again later.');
            props.navigation.navigate('SignUp');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nickname</Text>
            <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
            />
            <Text style={styles.label}>Gender</Text>
            <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
            />
            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                value={location}
                //onChangeText={setLocation}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
});

export default SignUpScreen;
