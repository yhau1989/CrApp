import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, TextInput, Button, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { registro } from '../apis/usuarioapi';


export default class MantProveedoresForm extends React.Component {

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
                <View style={styles.containerForm}>
                    {/* <TextInput style={styles.input} placeholder='Nombres' onChangeText={(value) => this.setState({ nombre: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Apellidos' onChangeText={(value) => this.setState({ apellido: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <TextInput secureTextEntry={true} style={styles.input} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })}/> */}

                    <Button buttonStyle={styles.boton} title="Vender" accessibilityLabel="Vender"
                    onPress={this._onPressButton.bind(this)}>
                    </Button>






                <View style={styles.footer}>
                    <View style={styles.boxlateral}>
                        <Text style={styles.textLateral}>
                            <Ionicons name="ios-person-add" size={20} style={styles.textLateral} />    Nuevo
                            </Text>
                    </View>
                    <View style={styles.boxlateral}>
                        <Text style={styles.textLateral}>
                            <Ionicons name="md-create" size={20} style={styles.textLateral} />    Editar
                            </Text>
                    </View>
                    <View style={styles.boxlateral}>
                        <Text style={styles.textLateral}>
                            <Ionicons name="ios-cloud-done" size={20} style={styles.textLateral} />    Guardar
                            </Text>
                    </View>
                </View>








                </View>

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
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderColor: 'grey',
    },
    boxlateral: {
        flex: 1,
        justifyContent: 'center',
        width: '33.3333%',
        alignItems: 'center',
        borderColor: 'grey',
        height: 60,
    },
    textLateral: {
        color: 'grey',
    },
});


AppRegistry.registerComponent('MantProveedoresForm', () => MantProveedoresForm);