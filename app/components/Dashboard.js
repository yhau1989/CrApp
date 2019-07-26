import * as React from 'react';
import { Alert, View, StyleSheet, AppRegistry, ImageBackground, Text, Button} from 'react-native';
import NavigationService from "./NavigationService";


export default class Dashboard extends React.Component {
    
    registerPressMantenimientos() { NavigationService.navigate('Register'); }
    registerPressCompras() { NavigationService.navigate('Register'); }
    registerPressVentas() { NavigationService.navigate('Register'); }
    registerPressOperaciones() { NavigationService.navigate('Register'); }
    registerPressSalir() { NavigationService.navigate('Login'); }

    render() {
        return (
           // <ImageBackground source={require('../assets/fondo_oscuro.png')} style={{ width: '100%', height: '100%', }}>
                <View style={styles.containerForm}>
                    {/* <TextInput style={styles.input} placeholder='Nombres' onChangeText={(value) => this.setState({ nombre: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Apellidos' onChangeText={(value) => this.setState({ apellido: value.trim() })} />
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                    <TextInput secureTextEntry={true} style={styles.input} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })}/>

                    <Button buttonStyle={styles.boton} title="Registrarse" accessibilityLabel="Registrarse"
                    onPress={this._onPressButton.bind(this)}>
                    </Button> */}


                <Text style={styles.welcome}>Opciones</Text>
                    <Text style={styles.instructions} onPress={this.registerPressMantenimientos.bind(this)}>Mantenimientos</Text>
                    <Text style={styles.instructions} onPress={this.registerPressCompras.bind(this)}>Compras</Text>
                    <Text style={styles.instructions} onPress={this.registerPressVentas.bind(this)}>Ventas</Text>
                    <Text style={styles.instructions} onPress={this.registerPressOperaciones.bind(this)}>Operaciones</Text>
                    <Text style={styles.instructions} onPress={this.registerPressSalir.bind(this)}>Salir</Text>
                


                </View>
           // </ImageBackground>

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
        marginBottom:90,
        color: 'grey',
        fontWeight: '900',
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
    instructions: {
        textAlign: 'center',
        color: 'grey',
        marginBottom: 5,
        fontWeight: '500',
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


AppRegistry.registerComponent('Dashboard', () => Dashboard);