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
                    <View style={{width:'100%'}}>
                        <Text style={styles.instructions} onPress={this.registerPressMantenimientos.bind(this)}>
                            <Ionicons name="ios-albums" size={26} color="#191919" />   Mantenimientos
                        </Text>
                    <Text style={styles.instructions} onPress={this.registerPressOperacioneDashs.bind(this)}>
                        <Ionicons name="ios-apps" size={26} color="#191919" />   Procesos
                        </Text>
                        <Text style={styles.instructions} onPress={this.registerReportes.bind(this)}>
                        <Ionicons name="md-stats" size={26} color="#191919" />   Reportes
                        </Text>

                        <Text style={styles.instructions} onPress={this.registerPressSalir.bind(this)}>
                        <Ionicons name="ios-arrow-round-back" size={26} color="#191919" />   Salir
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
        width: '100%'
    },
    welcome: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom:90,
        color: 'black',
        fontWeight: '900',
    },
    instructions: {
        fontSize: 20,
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
        paddingTop: 15,
        paddingBottom:15,
        borderBottomColor: '#323232',
        borderBottomWidth: 0.5,
        paddingLeft: 26,
    },
});


AppRegistry.registerComponent('Dashboard', () => Dashboard);