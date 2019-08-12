import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AppRegistry, TextInput, Text, View, TouchableOpacity,
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { listmaterial } from '../apis/materialapi';
import { listcliente } from '../apis/clientesapi';
import { addcompra } from '../apis/comprasapi';


export default class VentasForm extends React.Component {

    _isMounted = false;



    constructor(props) {
        super(props);
         this.state = {
            usuarioComprador: '11', precio: '', color: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Cliente', 
             dataSourceMaterial: '', dataSourceProveedor: '', isLoading: true, existeError: false, lista: [''], peso:'' }
        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton() {

        // let proveedor = this.state.tipo
        // let material = this.state.idMaterial
        // let comprador = this.state.usuarioComprador
        // let valor = this.state.valorCompra

        // if (proveedor.length <= 0 || material.length <= 0 || comprador.length <= 0 || valor.length <= 0) {
        //     Alert.alert('Ingrese los datos para continuar')
        // }
        // else {
        //     Alert.alert('Cargando...')
        //     addcompra(this.state.idProveedor, this.state.idMaterial, this.state.peso, this.state.usuarioComprador, this.state.valorCompra).then((responseJson) => {
        //         if (responseJson.error == 0) {
        //             this.cancelPress()
        //         }
        //         Alert.alert(responseJson.mensaje)
        //     }).catch((error) => {
        //         Alert.alert('Problemas para registrar su compra, intentelo nuevamente')
                
        //     })
        // }

        let listaU = this.state.lista
        listaU.push(this.state.color)

        this.setState({lista:listaU})

    }

    onSelectMaterial(value, label) {
        this.setState({ valueMateial: label, idMaterial: value })
        let materiales = this.state.dataSourceMaterial.data.filter(mat => mat.id == value)
        if (materiales.length > 0) {
            this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', id: materiales[0].id, color: materiales[0].tipo, })
        }
    }

    onSelectProveedor(value, label) {
        this.setState({ valueProveedor: label, idProveedor: value })
        let provee = this.state.dataSourceProveedor.data.filter(prov => prov.id == value)
        if (provee.length > 0) {
            this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', id: provee[0].id, ruc: provee[0].ruc, nombre: provee[0].nombres, apellido: provee[0].apellidos, direccion: provee[0].direccion, email: provee[0].email, telefono: provee[0].telefono })
        }

    }

    validateList = (obj) => {
        let lista = {
            error: 0,
            mensaje: null,
            data: null
        }
        return (obj.data && obj.data.length > 0) ? obj : lista
    }

    getlisMateriales() {
        this._isMounted = true;

        listmaterial().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            if (this._isMounted) {
                this.setState({ existeError: error, isLoading: false, dataSourceMaterial: this.validateList(responseJson) })
            }
        }).catch((error) => {
            Alert.alert('Problemas para listar los tipo de materiales')
            //Alert.alert(error)
        })
    }

    getlisClient() {
        this._isMounted = true;

        listcliente().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            if (this._isMounted) {
                this.setState({ existeError: error, isLoading: false, dataSourceProveedor: this.validateList(responseJson) })
            }
        }).catch((error) => {
            Alert.alert('Problemas para listar los proveedores')
        })
    }

    loadCompo() {
        this.getlisMateriales()
        this.getlisClient()
    }

    cancelPress() { this.setState({ peso: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Proveedor', valorCompra: '' }) }


    render() {

        this.loadCompo()
        if (this.state.isLoading && this.state.existeError === false) {
            return (
                <View style={styles.containerForm}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        return (
            <SafeAreaView style={styles.containerForm}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                    <TouchableWithoutFeedback>
                        <View style={{ width: '90%'  }}>
                           
                            <Text style={styles.labelItem}>Cliente</Text>
                            <Select
                                onSelect={this.onSelectProveedor.bind(this)}
                                defaultText={this.state.valueProveedor}
                                style={{ margin: 3, width: '98%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
                                textStyle={{}}
                                backdropStyle={{ backgroundColor: "#F6F8FA", }}
                                optionListStyle={{ backgroundColor: "#ffffff", width: '80%', height: '60%', }}>
                                {
                                    this.state.dataSourceProveedor.data ? (
                                        this.state.dataSourceProveedor.data.map((client) => (
                                            <Option key={client.id} value={client.id}>{`${client.nombres} ${client.apellidos}`}</Option>
                                        )
                                        )
                                    )
                                        : ('')
                                }
                            </Select>
                           
                            <Text style={styles.labelItem}>Material</Text>
                            <Select
                                onSelect={this.onSelectMaterial.bind(this)}
                                defaultText={this.state.valueMateial}
                                style={{ margin: 3, width: '98%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
                                textStyle={{}}
                                backdropStyle={{ backgroundColor: "#F6F8FA", }}
                                optionListStyle={{ backgroundColor: "#ffffff", width: '80%', height: '60%', }}>
                                {
                                    this.state.dataSourceMaterial.data ?
                                        (
                                            this.state.dataSourceMaterial.data.map((material) => (
                                                <Option key={material.id} value={material.id}>{material.tipo}</Option>
                                            ))
                                        )
                                        : ('')
                                }
                            </Select>

                           

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row', justifyContent: 'center',
                                alignItems: 'center'}}>

                                <View View={{ width: 300, }}>
                                    <Text style={styles.labelItem}>Precio</Text>
                                    <TextInput style={styles.input} width={60} placeholder='$' value={this.state.precio} onChangeText={(value) => this.setState({ precio: value })} /> 
                                </View>
                                <View View={{ width: 300, }}>
                                    <Text style={styles.labelItem}>Peso</Text>
                                    <TextInput style={styles.input} width={60} value={this.state.peso} onChangeText={(value) => this.setState({ peso: value })} />
                                </View>
                                <View View={{ width: 300, }}>       
                                    <Text style={styles.labelItem}>Descripcion (color)</Text>
                                    <TextInput style={styles.input} width={250}  value={this.state.color} onChangeText={(value) => this.setState({ color: value })} />
                                </View>

                            </View>
                            

                            <View style={styles.viewMaint}>
                                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                    <Text style={styles.botonText}>Añadir item</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.cancelPress.bind(this)}>
                                    <Text style={styles.botonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.botonText}>Vender</Text>
                                </TouchableOpacity>
                            </View>
                           

                            <Text style={styles.labelItem}>Items</Text>
                            {
                                this.state.lista.map((item) => (
                                    <Text key={item}>{item}</Text>
                                ))
                            }



                        </View>

                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
       paddingTop: 5,
        alignItems: 'center',
        color: '#323232',
        width: '100%',
        height: '100%'
    },
    viewMaint: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        margin: 3,
        padding: 2,
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
        width: 120,
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
    labelItem: {
        fontWeight: '700',
    },
});


AppRegistry.registerComponent('VentasForm', () => VentasForm);