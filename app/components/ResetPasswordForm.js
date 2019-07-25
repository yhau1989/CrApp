import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, ImageBackground, TextInput, Button} from 'react-native';
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
            <ImageBackground source={require('../assets/fondo_oscuro.png')} style={{ width: '100%', height: '100%', }}>
                <View style={styles.containerForm}>
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <Button buttonStyle={styles.boton} title="Recuperar contraseña" accessibilityLabel="RecuperarContrasena"
                    onPress={this._onPressButton.bind(this)}>
                    </Button>
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


AppRegistry.registerComponent('ResetPasswordForm', () => ResetPasswordForm);