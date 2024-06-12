import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const CalculationScreen = (props) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

    const images = {
        1: require('../assets/keypad (1).png'),
        2: require('../assets/keypad (2).png'),
        3: require('../assets/keypad (3).png'),
        4: require('../assets/keypad (4).png'),
        5: require('../assets/keypad (5).png'),
        6: require('../assets/keypad (6).png'),
        7: require('../assets/keypad (7).png'),
        8: require('../assets/keypad (8).png'),
        9: require('../assets/keypad (9).png'),
        0: require('../assets/keypad (0).png')
    };
    useEffect(() => {
        generateRandomNumbers();
        const id = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(intervalId);
            //결과 창 보여주기
            alert(`Time's up! Your score is: ${score}`);
            //
            setScore(0);
        }
    }, [timer]);

    const generateRandomNumbers = () => {
        setNum1(Math.floor(Math.random() * 10));
        setNum2(Math.floor(Math.random() * 10));
        setInput('');
    };

    const handleNumberPress = (number) => {
        if (input.length < 2) {
            setInput(input + number);
        }
    };

    const checkAnswer = () => {
        const correctAnswer = num1 + num2;
        if (parseInt(input) === correctAnswer) {
            setScore(score + 10);
        } else {
            setScore(score - 10);
        }
        generateRandomNumbers();
    };

    useEffect(() => {
        if ((num1 + num2) < 10 && input.length === 1) {
            checkAnswer();
        } else if ((num1 + num2) >= 10 && input.length === 2) {
            checkAnswer();
        }
    }, [input]);

    return (
        <ImageBackground
            source={require('../assets/BackGround.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/calculationtemplet.png')}
                    style={styles.templateBackground}
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.scoreText}>{score}</Text>
                        <Text style={styles.timerText}>남은 시간: {timer}</Text>
                        <View style={styles.numbersContainer}>
                            <ImageBackground source={require('../assets/calculationOutputBox.png')} style={styles.numberBox}>
                                <Text style={styles.numberText}>{num1}</Text>
                            </ImageBackground>
                            <Text style={styles.operatorText}>+</Text>
                            <ImageBackground source={require('../assets/calculationOutputBox.png')} style={styles.numberBox}>
                                <Text style={styles.numberText}>{num2}</Text>
                            </ImageBackground>
                        </View>
                        <ImageBackground source={require('../assets/calculationInputBox.png')} style={styles.inputBox}>
                            <Text style={styles.inputText}>{input}</Text>
                        </ImageBackground>
                        <View style={styles.numberPad}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    style={styles.numberButton}
                                    onPress={() => handleNumberPress(num.toString())}
                                >
                                    <Image
                                        source={images[num]}
                                        style={styles.numberButtonImage}
                                    />
                                    <Text style={styles.numberButtonText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={styles.numberButton}
                                onPress={() => handleNumberPress('0')}
                            >
                                <Image
                                    source={images[0]}
                                    style={styles.numberButtonImage}
                                />
                                <Text style={styles.numberButtonText}>0</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreText: {
        fontSize: 24,
        color: '#fff',
        marginLeft: 0,
        top:0
    },
    timerText: {
        fontSize: 24,
        color: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    numbersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    numberBox: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
    },
    numberText: {
        fontSize: 36,
        color: '#000',
    },
    operatorText: {
        fontSize: 36,
        color: '#fff',
    },
    inputBox: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    inputText: {
        fontSize: 36,
        color: '#000',
    },
    numberPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '60%',
        justifyContent: 'center',
    },
    numberButton: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
    },
    numberButtonImage: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 5,
        left: 5,
    },
    numberButtonText: {
        fontSize: 24,
        color: '#fff',
        position: 'absolute',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    templateBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CalculationScreen;
