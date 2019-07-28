import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, ImageBackground, TextInput, Button} from 'react-native';
//import { registro } from '../apis/usuarioapi';


export default class ComprasForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { nombre: '', apellido:'', email: '', password: '' }
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        let emailError = this.state.email;
        let passwordError = this.state.password;
        let nombre = this.state.nombre;
        let apellido = this.state.apellido;
        if (emailError.length <= 0 || passwordError.length <= 0 || nombre.length <= 0 || apellido.length <= 0) {
            Alert.alert('Ingrese los datos para continuar');
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
            <ImageBackground source={require('../assets/fondo_oscuro.png')} style={{ width: '100%', height: '100%', }}>
                <View style={styles.containerForm}>
                    {/* <TextInput style={styles.input} placeholder='Nombres' onChangeText={(value) => this.setState({ nombre: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Apellidos' onChangeText={(value) => this.setState({ apellido: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <TextInput secureTextEntry={true} style={styles.input} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })}/> */}

                    <Button buttonStyle={styles.boton} title="Comprar" accessibilityLabel="Comprar"
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


AppRegistry.registerComponent('ComprasForm', () => ComprasForm);