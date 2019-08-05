import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";


export default class ProcesosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { nombre: '', apellido:'', email: '', password: '' }
        this._onPressButton = this._onPressButton.bind(this);
    }

    LoteSeleccionamiento() { NavigationService.navigate('LoteSeleccionamiento'); }
    ProcesarLoteForm() { NavigationService.navigate('ProcesarLoteForm'); }
    ProcesoAlmacenajeLoteForm() { NavigationService.navigate('ProcesoAlmacenajeLoteForm'); }

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
                <Text style={styles.welcome}>Procesamiento de Materia Prima</Text>
                <View>
                    <Text style={styles.instructions} onPress={this.LoteSeleccionamiento.bind(this)}>
                        <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Seleccionamiento
                        </Text>
                    <Text style={styles.instructions} onPress={this.ProcesarLoteForm.bind(this)}>
                        <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Trituración
                        </Text>
                    <Text style={styles.instructions} onPress={this.ProcesoAlmacenajeLoteForm.bind(this)}>
                        <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Almacenamiento
                        </Text>
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
        backgroundColor: '#69dd9a',
    },
    welcome: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 90,
        color: 'black',
        fontWeight: '900',
    },
    instructions: {
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
    },
});


AppRegistry.registerComponent('ProcesosForm', () => ProcesosForm);