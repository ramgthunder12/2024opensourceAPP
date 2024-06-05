import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const MainScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/MainImage.png')}
        style={styles.background}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}} style={styles.button}>
            <Image 
              source={require('../assets/PlayIcon.png')} 
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 200,
    height: 150,
  },
});

export default MainScreen;
