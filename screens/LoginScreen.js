import {Button, Text, View, TextInput, StyleSheet, Alert} from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ipAdress from "../configs/ipAdress.json";
import Adress from "../configs/ipAdressjs.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = (props) => {
//함수 놓는곳js
    const { navigation } = props;
    const [nickname, setNickname] = useState(''); // ID 상태 관리

    const handleLogin = async () => {
        //TODO 로그인 닉네임 검증
        //TODO 닉네임으로 할건지 아이디로 할껀지 말 통일 하기 변수명 이상함
        //여기서 ID와 비밀번호 검증 로직 추가 (예: 서버에 요청)
        console.log("handleLogin : here~!");
        //1. axios 통신으로 값 주고 받기 get방식 api/users/login/{nickname}
        //2. 로그인 성공하면 값 저장하고
        //3. 홈으로 가기
        //1.
        try{
            const response = await axios.get(`${ipAdress.ngrokServerAdress}/users/login/${nickname}`);
            if (nickname === response.data.nickname) {
                //뭘보고 성공 실패 판단할껀지
                //input으로 들어온 값과 응답값의 nickname을 같은지 확인
                //2. -1 성공하면

                await AsyncStorage.setItem('id', JSON.stringify(response.data.id));
                await AsyncStorage.setItem('nickname', response.data.nickname);
                await AsyncStorage.setItem('location', response.data.location);
                await AsyncStorage.setItem('gender', response.data.gender);
                await AsyncStorage.setItem('genderPublic', JSON.stringify(response.data.genderPublic));
                await AsyncStorage.setItem('age', JSON.stringify(response.data.age));

                //3.
                props.navigation.navigate('Home');
            } 
        } catch (error) {
            //2. -2 실패하면 404 뜸
            Alert.alert("Login Failed, Doesn't exist id");
            props.navigation.navigate('Login');
        }
        
        // if (id === 'test' && password === 'password') {
        //     try {
        //         await AsyncStorage.setItem('userId', id);
        //         Alert.alert('Login Success', `Welcome back, ${id}!`);
        //         props.navigation.navigate('Home');
        //     } catch (error) {
        //         console.error('Failed to save the data to storage', error);
        //     }
        // } else {
        //     Alert.alert('Login Failed', 'Invalid ID or psassword');
        // }
    };
/*    const login = async(id)=> {
        try {
            //아이디 맞는지 확인
            const response = await axios.get(`${ipAdress.ngrokServerAdress}/api/users`,{
                headers: {
                },
                params : {
                    userId:id
                }}
            );
            console.log(response.data);
            //아이디 추가해서 새로운 계정 만들기
            //아이디 값 담기
            //위치 주소 가지고 오기
            //위치 주소 값 담기
            //서버에 보내기
        }  catch (error) {
            console.log(response.data);
        }
    };*/
    useEffect(() => {

        //자동 로그인 하고 없으면 회원 가입으로 넘어가기
        const checkStoredCredentials = async () => {
            try {
                const storedNicname = await AsyncStorage.getItem('nickname');
                console.log('storedNicname : '+ storedNicname);
                //TODO 로그인으로 들어와서 아이디가 AsyncStorage에 있는지 확인하고 있으면 자동로그인
                //회원가입 -> 로그인 -> 로그인후 AsyncStorage에 id 저장
                //
                if (storedNicname) {
                    // 자동 로그인 시도
                    console.log('자동 로그인 중...');
                    //TODO 위치 업데이트
                    props.navigation.navigate('Home');
                }
            } catch (error) {
                console.error('자동로그인에 실패했습니다. 회원가입 하십시오.', error);
                props.navigation.navigate('SignUp');
            }
        };

        checkStoredCredentials();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
            }}>

            <Text>NICKNAME</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                editable={true}
                maxLength={20}
                onChangeText={(text) => setNickname(text)}>
            </TextInput>

            <Button title='Login'
                    //홈화면으로 이동
                    onPress={handleLogin}>
                    {/*axios 통신 테스트
                    onPress={() => {
                        handleSignUp()
                    }}>*/}
            </Button>
            <Button title='SignUp'
                //회원 가입으로 이동
                    onPress={() => {props.navigation.navigate('SignUp')}}>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({

    input: {
        height: 22,
        width: "50%",
        borderWidth: 1,
        backgroundColor: "#cecece",
        fontSize: 15,
        paddingBottom: 0,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: "center",
    }
})
export default LoginScreen;