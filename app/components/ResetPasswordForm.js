import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, TouchableOpacity, TextInput, Button, Text} from 'react-native';
import { resetpassword } from '../apis/usuarioapi';


export default class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '' }
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        let emailError = this.state.email;
        if (emailError.length <= 0 ) {
            Alert.alert('Ingrese los datos para continuar');
        }
        else {
            resetpassword(emailError).then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
                Alert.alert('existen problemas de conexión');
            });
        }
    }

    render() {
        return (
            
                <View style={styles.containerForm}>
                <TextInput placeholderTextColor='#323232' style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.botonText}>Recuperar contraseña</Text>
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


//AppRegistry.registerComponent('ResetPasswordForm', () => ResetPasswordForm);