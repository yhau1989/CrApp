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
                    <Text style={styles.welcome}>Mantenimiento</Text>
                    <View>

                        <Text style={styles.instructions} onPress={this.registerPressMateriales.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="grey" /> Materiales
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressClientes.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="grey" /> Clientes
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressProveedores.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="grey" /> Proveedores
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
    },
    welcome: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 90,
        color: 'grey',
        fontWeight: '900',
    },
    instructions: {
        //textAlign: 'left',
        color: 'grey',
        marginBottom: 5,
        fontWeight: '500',
    },
});


AppRegistry.registerComponent('DashboardMantenimientos', () => DashboardMantenimientos);