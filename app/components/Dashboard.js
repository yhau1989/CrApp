import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";


export default class Dashboard extends React.Component {
    
    registerPressMantenimientos() { NavigationService.navigate('Mantenimientos'); }
    registerPressOperacioneDashs() { NavigationService.navigate('DashboardProcesos'); }
    registerReportes() { NavigationService.navigate('DashboardReportes'); }
    registerPressSalir() { NavigationService.navigate('Login'); }

    render() {
        return (
                <View style={styles.containerForm}>
                    <Text style={styles.welcome}>Menú Principal</Text>
                    <View>
                        <Text style={styles.instructions} onPress={this.registerPressMantenimientos.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Mantenimientos
                        </Text>
                    <Text style={styles.instructions} onPress={this.registerPressOperacioneDashs.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Procesos
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerReportes.bind(this)}>
                            <Ionicons name="ios-arrow-dropright-circle" size={15} color="black" /> Reportes
                        </Text>

                        <Text style={styles.instructions} onPress={this.registerPressSalir.bind(this)}>
                            <Ionicons name="ios-arrow-round-back" size={15} color="black" /> Salir
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
        marginBottom:90,
        color: 'black',
        fontWeight: '900',
    },
    instructions: {
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
    },
});


AppRegistry.registerComponent('Dashboard', () => Dashboard);