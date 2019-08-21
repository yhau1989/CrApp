import * as React from 'react';
import { View, StyleSheet, AppRegistry, TouchableOpacity, TextInput, Text, 
    TouchableWithoutFeedback, StatusBar, SafeAreaView, Keyboard, KeyboardAvoidingView } from 'react-native';



export default class Example extends React.Component {

    
    render() {
        return (
            <SafeAreaView style={styles.containerForm}>
                <StatusBar barStyle="light-content"/>
                <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                    <TouchableWithoutFeedback >
                        <View style={{width:'80%'}}> 
                            <TextInput style={styles.input} placeholderTextColor='#323232' placeholderTextColor='#323232' placeholder='Nombres'  />
                            <TextInput style={styles.input} placeholderTextColor='#323232'  placeholder='Apellidos' />
                            <TextInput style={styles.input} placeholderTextColor='#323232'  placeholder='Email'  />
                            <TextInput style={styles.input} placeholderTextColor='#323232' placeholder='Dirección' />
                            <TextInput style={styles.input} placeholderTextColor='#323232' placeholder='Pais' />
                            <TextInput secureTextEntry={true} placeholderTextColor='#323232' style={styles.input} placeholder='Contraseña' />
                            
                            <View style={styles.viewMaint}>
                                <TouchableOpacity >
                                    <Text style={styles.botonText}>Ingresar</Text>
                                </TouchableOpacity>
                            </View>
                            

                            
                        </View>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }
}


const styles = StyleSheet.create({
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#2ecc71',
        color: '#323232',
        width: '100%',
    },
    viewMaint: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontWeight: '700',
    },
    instructions: {
        textAlign: 'center',
        color: '#4c4c4c',
        marginBottom: 5,
        fontWeight: '700',
    },
    input: {
        color: '#323232',
        margin: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#69dd9a',
    },
    botonText: {
        color: '#2ecc71',
        textAlign: 'center',
        backgroundColor: 'black',
        margin: 6,
        padding: 10,
        borderRadius: 5,
        fontWeight: '700',
        width: 200,
        fontSize:16
    },
    link: {
        textDecorationLine: 'underline'
    }
});


//AppRegistry.registerComponent('Example', () => Example);