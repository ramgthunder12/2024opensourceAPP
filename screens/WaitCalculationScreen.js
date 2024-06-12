import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from "@react-navigation/native";

const WaitCalculationScreen = (props) => {
    //-들어오면 방 잡기(home에서 하기) : 들어 오면서 위치, 닉네임 정보넣어서 요청하기
    //인원수 추가 됬다고 요청 보내기->응답으로 인원수 초과 했는지 확인하기
    //10초마다 인원스 변동 물어보기
    //인원수 다 차면 게임 시작하기(게임 화면으로 넘어가기)
    //게임 화면에서 초 시간 보여주기
    //랜덤 생성 화살표 보여주기
    //점수 체크하기
    //버튼 눌렀을때 값 들어 오기
    //시간초 끝나면 서버에 점수와 닉네임 보내기
    //1초 뒤에 다시 전체 결과 값 요청하기
    //결과값 보여주기
    //다시 waitCalculation으로 돌아오기
    const [gameName] = useState('arrow');
    const [id, setId] = useState('');
    const [userCount, setUserCount] = useState(1);

    useEffect(() => {
        const checkStoredCredentials = async () => {
            try {
                const response = await axios.post(`${ipAdress.ngrokServerAdress}/game/${arrow}`, {
                    // location하고 닉네임 저장해 놓고 써야될듯
                    nickname,
                    location
                });
            } catch (error) {
                console.log(error);
            }
        };

        checkStoredCredentials();

        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${ipAdress.ngrokServerAdress}/game/${arrow}/status`);
                setUserCount(response.data.userCount);
                if (response.data.isFull) {
                    // 인원이 다 찼을 때 게임 시작하기
                    props.navigation.navigate('GameScreen');
                }
            } catch (error) {
                console.log(error);
            }
        }, 1000000000000); // 10초마다 실행

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/BackGround.png')}
                style={styles.background}
            >
                <ImageBackground
                    source={require('../assets/WaitScreen.png')}
                    style={styles.waitbackground}
                >
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Chat')}} style={styles.settingsButton}>
                        <Image source={require('../assets/ChatIcon.png')} style={styles.icon} />
                    </TouchableOpacity>

                </ImageBackground>
            </ImageBackground>
            <TouchableOpacity onPress={() => {props.navigation.navigate('calculation')}} style={styles.startButton}>
                <Text style={styles.startButtonText}>시작</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    background: {
        //flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    waitbackground: {

        width: '97%',
        height: '97%',
        resizeMode: 'center',
        margin : 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    settingsButton: {
        alignItems: 'flex-end',
    },
    startButton: {
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{ translateX: -50 }],
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
})


export default WaitCalculationScreen;