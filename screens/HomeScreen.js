import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';

const HomeScreen = (props) => {
  const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let rand_name = '';  // Use let instead of const
  const rand_int = rand(1, 3);

  if (rand_int==1){
    rand_name='WaitArrow'
  }else if(rand_int==2){
    rand_name='WaitCalculation'
  }else if(rand_int==3){
    rand_name='WaitInitial'
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/BackGround.png')}
        style={styles.background}
      >
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.profileButton}>
            <Image source={require('../assets/User.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Image source={require('../assets/Setting.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {props.navigation.navigate('WaitArrow')}} style={[styles.gameButton, styles.arrowGameButton]}>
            <Image source={require('../assets/Arrow.png')} style={styles.gameIcon} />
            <Text style={styles.gameText}>화살표게임</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {props.navigation.navigate(rand_name)}} style={[styles.gameButton, styles.randomGameButton]}>
            <Image source={require('../assets/Random.png')} style={styles.gameIcon} />
            <Text style={styles.gameText}>랜덤게임</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {props.navigation.navigate('WaitCalculation')}} style={[styles.gameButton, styles.mathGameButton]}>
            <Image source={require('../assets/Calculation.png')} style={styles.gameIcon} />
            <Text style={styles.gameText}>연산게임</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {props.navigation.navigate('WaitInitial')}} style={[styles.gameButton, styles.initialGameButton]}>
            <Image source={require('../assets/Initial.png')} style={styles.gameIcon} />
            <Text style={styles.gameText}>초성게임</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowGameButton: {
    top: '15%',  // Adjust this value based on your requirement
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  randomGameButton: {
    top: '45%',  // Adjust this value based on your requirement
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  mathGameButton: {
    top: '75%',  // Adjust this value based on your requirement
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  initialGameButton: {
    top: '75%',  // Adjust this value based on your requirement
    left: '75%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  gameIcon: {
    width: 100,
    height: 100,
  },
  gameText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
});

export default HomeScreen;

