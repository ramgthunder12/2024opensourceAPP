import {Button, Text, View, TextInput, StyleSheet} from 'react-native'

const LoginScreen = (props) =>{

  return(
    <View
    style = {{
      flex :1,
      alignItems:"center",
      justifyContent: "center",
      padding: 15,
    }}>

      <Text>ID</Text>
      <TextInput
      style={styles.input}
      multiline={true}
      editable={true}
      maxLength = {20}>
      </TextInput>
      
      <Text>PW</Text>
      <TextInput
      style={styles.input}
      placeholder = '아무거나 입력'
      multiline={true}
      editable={true}
      maxLength = {20}>
      </TextInput>
      <Button title = 'SEND' 
      onPress={() => {props.navigation.navigate('Home')}}></Button>
    </View>
  )
}
const styles = StyleSheet.create({

	input: {
    height : 22,
    width:"50%",
    borderWidth:1,
    backgroundColor:"#cecece",
    fontSize : 15,
    paddingBottom:0,
    paddingTop : 0,
    alignItems:'center',
    justifyContent: "center",
  }
})
export default LoginScreen;