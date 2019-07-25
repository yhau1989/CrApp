import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, ImageBackground, Text, TextInput, Button} from 'react-native';
import {login} from '../apis/usuarioapi';
import NavigationService from "./NavigationService";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: ''}
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        let emailError = this.state.email;
        let passwordError = this.state.password;
        if (emailError.length <= 0 || passwordError.length <= 0){
            Alert.alert('Ingrese usuario y contraseña');
        }
        else
        {
            login(emailError, passwordError).then((responseJson) => {
                this.setState({ password: '' })
                let g = (responseJson.error == 0) ? 'Login exitoso' : responseJson.mensaje;
                Alert.alert(g);
            }).catch((error) => {
                Alert.alert('Exiten problemas de conexión');
            });
        }
    }

    registerPress () {NavigationService.navigate('Register');}

    resetPasswordPress() { NavigationService.navigate('ResetPassword');}


    render() {
        const resizeMode = 'center';
        const text = 'This is some text inlaid in an <Image />';


        return (
            <ImageBackground source={require('../assets/fondo_oscuro.png')} style={{ width: '100%', height: '100%', }}>
                <View style={styles.containerForm}>
                    <Text style={styles.welcome}>Procefibras App</Text>
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })} />
                    <Button buttonStyle={styles.boton} title="Ingresar" accessibilityLabel="Ingrese los datos y presiones aquí para continuar"
                        onPress={this._onPressButton.bind(this)}
                    ></Button>

                    <Text style={styles.instructions}>
                      Si no tienes cuenta <Text style={styles.link} onPress={ this.registerPress.bind(this) }>registrate aquí</Text>
                    </Text>
                    <Text style={styles.instructions}>
                        <Text style={styles.link} onPress={this.resetPasswordPress.bind(this)}>Recuperar contraseña</Text>
                    </Text>
                    
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
        fontSize: 22,
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
    link: {
      textDecorationLine: 'underline'
    }
});


AppRegistry.registerComponent('LoginForm', () => LoginForm);