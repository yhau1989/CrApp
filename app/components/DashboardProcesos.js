import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";


export default class DashboardProcesos extends React.Component {
    
    registerPressMantenimientos() { NavigationService.navigate('Mantenimientos'); }
    registerPressCompras() { NavigationService.navigate('Compras'); }
    registerPressVentas() { NavigationService.navigate('Ventas'); }
    registerPressOperaciones() { NavigationService.navigate('Procesos'); }

    registerPressSalir() { NavigationService.navigate('Login'); }

    render() {
        return (
                <View style={styles.containerForm}>
                    <Text style={styles.welcome}>Seleccionar Proceso</Text>
                    <View>
                            <Text style={styles.instructions} onPress={this.registerPressCompras.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Compras
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressVentas.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Ventas
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressOperaciones.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Operaciones de matria prima
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


AppRegistry.registerComponent('DashboardProcesos', () => DashboardProcesos);