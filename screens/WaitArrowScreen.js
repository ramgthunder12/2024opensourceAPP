import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';

const WaitArrowScreen = (props) => {
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
})


export default WaitArrowScreen;