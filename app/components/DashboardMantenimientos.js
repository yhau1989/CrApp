import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";


export default class DashboardMantenimientos extends React.Component {
    
    registerPressMateriales() { NavigationService.navigate('Materiales'); }
    registerPressClientes() { NavigationService.navigate('Clientes'); }
    registerPressProveedores() { NavigationService.navigate('Proveedores'); }

    render() {
        return (
                <View style={styles.containerForm}>
                    <Text style={styles.welcome}>
                    <Ionicons name="ios-albums" size={26} color="#191919" /> Mantenimiento</Text>
                <View style={{ width: '100%' }}>

                        <Text style={styles.instructions} onPress={this.registerPressMateriales.bind(this)}>
                        <Ionicons name="ios-analytics" size={26} color="#191919" />   Materiales
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressClientes.bind(this)}>
                        <Ionicons name="ios-happy" size={26} color="#191919" />   Clientes
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressProveedores.bind(this)}>
                        <Ionicons name="ios-people" size={26} color="#191919" />   Proveedores
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
        fontSize: 20,
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#323232',
        borderBottomWidth: 0.5,
        paddingLeft: 26,
    },
});


AppRegistry.registerComponent('DashboardMantenimientos', () => DashboardMantenimientos);