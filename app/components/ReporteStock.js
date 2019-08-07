import * as React from 'react';
import {
    Alert, StyleSheet, AppRegistry, ActivityIndicator, Text, Picker, View, TouchableOpacity,
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import Table from 'react-native-simple-table'
import { getStocks } from '../apis/stocksapi';




const columns = [
    {
        title: 'Material',
        dataIndex: 'tipo',
        width: 280,
    },
    {
        title: 'Stock (libras)',
        dataIndex: 'stock',
        width: 90
    }
];



export default class ReporteStock extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props)
        //this.getlisClientes()
        this.state = { dataSource: '', isLoading: true, existeError: false}
        
    }

   
    componentWillUnmount() {
        this._isMounted = false;
    }
    

    componentDidMount() {
        //this._isMounted = true
        //Alert.alert('Cargando.......')
        getStocks().then((responseJson) => {
            //let error = (responseJson.error == 0) ? false : true
            this.setState({ isLoading: false, dataSource: responseJson.data })
        }).catch((error) => {
            Alert.alert('Problemas para listar los clientes')
        })
    }

     

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Cargando...</Text>
                    <ActivityIndicator />
                </View>
            )
        }
       
        
        return (
            <SafeAreaView style={styles.containerForm}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                    <TouchableWithoutFeedback>


                        <View style={{ width: '90%', paddingTop: 10 }}>
                            <Table height={320} columnWidth={60} columns={columns} dataSource={this.state.dataSource} />
                        </View> 

                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

                
            </SafeAreaView>





        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
        //justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        color: '#323232',
        width: '100%',
        height: '100%'
    },
    viewMaint: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        margin: 6,
        padding: 5,
        borderRadius: 5,
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
        fontSize: 16
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    boxlateral: {
        flex: 1,
        justifyContent: 'center',
        width: '33.3333%',
        alignItems: 'center',
        borderColor: 'grey',
        height: 60,
    },
    textLateral: {
        color: 'grey',
        paddingBottom: 10,
    },
});


AppRegistry.registerComponent('ReporteStock', () => ReporteStock);