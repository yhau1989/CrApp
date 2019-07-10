import * as React from 'react';
import { View, StyleSheet, AppRegistry, ImageBackground, Text, TextInput, Button, TouchableOpacity } from 'react-native';


const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class LoginForm extends React.Component {
    render() {


        const resizeMode = 'center';
        const text = 'This is some text inlaid in an <Image />';


        return (
            <ImageBackground source={require('../assets/fondo.jpg')} style={{ width: '100%', height: '100%', }}>
                <View style={styles.containerForm}>
                    <Text style={styles.welcome}> Welcome to React Native samuel 1989 </Text>
                    <TextInput style={styles.input} placeholder='Email' />
                    <TextInput style={styles.input} placeholder='Contraseña' />
                    <Button buttonStyle={styles.boton} title="Ingresar" accessibilityLabel="Ingrese los datos y presiones aquí para continuar"></Button>

                   <TouchableOpacity>
                       <Text style={styles.boton}>Boton</Text>
                   </TouchableOpacity>


                    <Text style={styles.instructions}>Si no tienes cuenta registrate aquí</Text>
                    <Text style={styles.instructions}>Recuperar contraseña</Text>
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
    input:{
        borderColor: 'grey', 
        //color: 'grey',
        borderWidth: 1, 
        backgroundColor: 'white',
        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,

    },
    boton:{
        backgroundColor: 'grey',
        color: 'blue',
        borderWidth: 1,

        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,
    },
});

AppRegistry.registerComponent('LoginForm', () => LoginForm);