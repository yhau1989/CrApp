import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text, TouchableOpacity } from 'react-native';


export default class Itemfactura extends React.Component {
    render() {

        return (
                <View style={styles.containerForm}>
                    <Text style={styles.bold}>Id Material: <Text style={styles.welcome}>{this.props.material}</Text></Text>
                    <Text style={styles.bold}>Material: <Text style={styles.welcome}>{this.props.descripcion}</Text></Text>
                    <Text style={styles.bold}>Peso: <Text style={styles.welcome}>{this.props.peso}</Text></Text>
                    <Text style={styles.bold}>Valor:<Text style={styles.welcome}> $ {this.props.valor}</Text></Text>
                    <View style={{ paddingRight:5}}>
                    <Text style={styles.botonText} onPress={this.props.press}>Eliminar</Text>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
        margin: 5,
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.23,
        

    },
    welcome: {
        fontSize: 14,
        margin: 2,
        color: 'grey',
        fontWeight: '700',
    },
    bold: {
        color: 'black',
        fontWeight: '700',
    },
    botonText: {
        color: '#2ecc71',
        padding: 2,
        borderRadius: 5,
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'right',
        color:'red',
        textDecorationLine: 'underline'
    },

});

//AppRegistry.registerComponent('Itemfactura', () => Itemfactura);