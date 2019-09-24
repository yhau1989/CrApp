import * as React from 'react';
import { Alert, View, StyleSheet, AsyncStorage, TouchableOpacity, Text, TextInput,
TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import {login} from '../apis/usuarioapi';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import NavigationService from "./NavigationService";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: ''};
        this._onPressButton = this._onPressButton.bind(this);
    }

    saveUserId = async (userId) => {
        try {
            await AsyncStorage.setItem('userId', userId);
        } catch (error) {
            console.log(error.message);
        }
    };

    _onPressButton() 
    {
        let emailError = this.state.email;
        let passwordError = this.state.password;
        if (emailError.length <= 0 || passwordError.length <= 0)
        {
           Alert.alert('Ingrese usuario y contraseña')
        }
        else
        {
            login(emailError, passwordError).then((responseJson) => {
                if (responseJson.error == 0)
                {
                    this.setState({ email: '', password: '' });
                    this.saveUserId(responseJson.data);
                    NavigationService.navigate('Dashboard');
                }
                else
                {
                    Alert.alert(responseJson.mensaje);   
                }
            }).catch((error) => {
                Alert.alert('Exiten problemas de conexión' + error);
            });
        }
    }
S
    registerPress () {NavigationService.navigate('Register');}

    resetPasswordPress() { NavigationService.navigate('ResetPassword');}


    render() {
        return (


             <SafeAreaView style={styles.containerForm}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                    <TouchableWithoutFeedback>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
                        <MaterialCommunityIcons name="recycle" size={76} color="#191919"/>
                        
                            <Text style={styles.welcome}>Procefibras App</Text>
                            <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#323232' value={this.state.email} onChangeText={(value) => this.setState({ email: value.trim() })} />
                            <TextInput placeholderTextColor='#323232' secureTextEntry={true} style={styles.input} value={this.state.password} placeholder='Contraseña' onChangeText={(value) => this.setState({ password: value.trim() })} />

                            <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                <Text style={styles.botonText}>Ingresar <Ionicons name="ios-arrow-forward" size={14} color="#2ecc71"/>
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.instructions}>
                            Si no tienes cuenta <Text style={styles.link} onPress={ this.registerPress.bind(this) }>registrate aquí</Text>
                            </Text>
                            <Text style={styles.instructions}>
                                <Text style={styles.link} onPress={this.resetPasswordPress.bind(this)}>Recuperar contraseña</Text>
                            </Text>
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
        textAlign: 'center',
        flex: 1,
        backgroundColor: '#2ecc71',
        color: '#323232',
        width: '100%',
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
    input:{
        color: '#323232',
        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#69dd9a',
        
    },
    botonText:{
        color: '#2ecc71',
        textAlign: 'center',
        backgroundColor: 'black',
        margin: 6,
        padding: 10,
        borderRadius: 5,
        fontWeight: '700',
        width: 200,
        fontSize: 16,
    },
    link: {
      textDecorationLine: 'underline'
    }
});


//AppRegistry.registerComponent('LoginForm', () => LoginForm);