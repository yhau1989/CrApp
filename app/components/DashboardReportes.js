import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";


export default class DashboardReportes extends React.Component {
    
    // registerPressMantenimientos() { NavigationService.navigate('Mantenimientos'); }
    // registerPressCompras() { NavigationService.navigate('Compras'); }
    // registerPressVentas() { NavigationService.navigate('Ventas'); }
    registerStockReport() { NavigationService.navigate('ReporteStock'); }

   // registerPressSalir() { NavigationService.navigate('Login'); }

    render() {
        return (
                <View style={styles.containerForm}>
               
                    <Text style={styles.welcome}>
                    <Ionicons name="md-stats" size={36} color="#191919" /> Reportes</Text>
                <View style={{ width: '100%' }}>
                            <Text style={styles.instructions} >
                        <Ionicons name="ios-rocket" size={26} color="#191919"  />   Ventas
                        </Text>
                        <Text style={styles.instructions} >
                        <Ionicons name="ios-cart" size={26} color="#191919"  />   Compras
                        </Text>
                        <Text style={styles.instructions} >
                        <Ionicons name="ios-switch" size={26} color="#191919" />   Materias Primas
                        </Text>

                    <Text style={styles.instructions} onPress={this.registerStockReport.bind(this)}>
                        <Ionicons name="ios-pulse" size={26} color="#191919" />   Stock
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


AppRegistry.registerComponent('DashboardReportes', () => DashboardReportes);