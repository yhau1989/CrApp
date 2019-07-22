import * as React from 'react';
import { View, StyleSheet, AppRegistry, Image, ImageBackground, Text  } from 'react-native';


const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundForm extends React.Component {
  render() {


    const resizeMode = 'center';
    const text = 'This is some text inlaid in an <Image />';


    return (     
      /*<Image  source={require('../assets/fondo.jpg')} style={styles.containerForm}>
      
      </Image>*/

      
        
      <ImageBackground source={require('../assets/fondo_oscuro.png')} style={{ width: '100%', height: '100%',  }}>
        <View style={styles.containerForm}>
          <Text style={styles.welcome}> Welcome to React Native samuel 1989 </Text>
          <Text style={styles.instructions}> To get started, edit App.js </Text>
          <Text style={styles.instructions}> Software Monkey  </Text>
        </View> 
      </ImageBackground>

     
       
     

    );
  }
}

const styles = StyleSheet.create({
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontWeight: '700',
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: '700',
  },
});

AppRegistry.registerComponent('BackgroundForm', () => BackgroundForm);