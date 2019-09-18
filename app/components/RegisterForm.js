import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, TouchableOpacity, TextInput, Button, Text} from 'react-native';
import { registro } from '../apis/usuarioapi';


export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { nombre: '', apellido:'', email: '', password: '' }
        this._onPressButton = this._onPressButton.bind(this);
    }

    _validaEmail(email)
    {
        return (email.includes("@procefibras.com")) ?  true : false;

    }

    _onPressButton() {
        let emailError = this.state.email;
        let passwordError = this.state.password;
        let nombre = this.state.nombre;
        let apellido = this.state.apellido;
        if (emailError.length <= 0 || passwordError.length <= 0 || nombre.length <= 0 || apellido.length <= 0) {
            Alert.alert('Ingrese los datos para continuar');
        }
        else if (!this._validaEmail(emailError))
        {
            Alert.alert('correo electrónico no autorizado');
        }
        else {
            registro(nombre, apellido, emailError, passwordError).then((responseJson) => {
                Alert.alert(responseJson.mensaje);
            }).catch((error) => {
                Alert.alert('existen problemas de conexión');
            });
        }
    }

    render() {
        return (
                <View style={styles.containerForm}>
                    <TextInput placeholderTextColor='#323232' style={styles.input} placeholder='Nombres' onChangeText={(value) => this.setState({ nombre: value.trim() })} />
                    <TextInput placeholderTextColor='#323232' style={styles.input} placeholder='Apellidos' onChangeText={(value) => this.setState({ apellido: value.trim() })} />
                    <TextInput placeholderTextColor='#323232' style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <TextInput placeholderTextColor='#323232' secureTextEntry={true} style={styles.input} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })}/>

                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <Text style={styles.botonText}>Registrarse</Text>
                    </TouchableOpacity>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#2ecc71',
        color: '#323232',
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontWeight: '700',
    },
    instructions: {
        textAlign: 'center',
        color: '#4c4c4c',
        marginBottom: 5,
        fontWeight: '700',
    },
    input: {
        color: '#323232',
        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#69dd9a',
    },
    botonText: {
        color: '#2ecc71',
        textAlign: 'center',
        backgroundColor: 'black',
        margin: 6,
        padding: 10,
        borderRadius: 5,
        fontWeight: '700',
        width: 200,
        fontSize: 16,
    },
    link: {
        textDecorationLine: 'underline'
    }
});


//AppRegistry.registerComponent('RegisterForm', () => RegisterForm);