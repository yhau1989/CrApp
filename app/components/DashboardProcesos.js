import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons, MaterialIcons, Entypo} from '@expo/vector-icons';
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
                    <Text style={styles.welcome}>
                    <Ionicons name="ios-apps" size={26} color="#191919" /> Seleccionar Proceso</Text>
                <View style={{ width: '100%' }}>
                            <Text style={styles.instructions} onPress={this.registerPressCompras.bind(this)}>
                        <MaterialIcons name="shopping-cart" size={26} color="#191919" />   Compras
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressVentas.bind(this)}>
                        <Entypo name="shop" size={26} color="#191919" />   Ventas
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerPressOperaciones.bind(this)}>
                        <Ionicons name="ios-git-network" size={26} color="#191919" />  Operaciones de matria prima
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


AppRegistry.registerComponent('DashboardProcesos', () => DashboardProcesos);