import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AppRegistry, TextInput, Text, View, TouchableOpacity,
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { listmaterial } from '../apis/materialapi';
import { listproveedor } from '../apis/proveedorapi';
import { addcompra } from '../apis/comprasapi';


export default class ComprasForm extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {
            usuarioComprador: '11', valorCompra: '', peso: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Proveedor', 
                        dataSourceMaterial: '', dataSourceProveedor:'', isLoading: true, existeError: false }
        this._onPressButton = this._onPressButton.bind(this);
    }

    componentWillMount() {
        this.loadCompo()
    }


    _onPressButton() {

        let proveedor = this.state.idProveedor
        let material = this.state.idMaterial
        let comprador = this.state.usuarioComprador
        let valor = this.state.valorCompra

      
        if (proveedor.length <= 0 || material.length<=0 || comprador.length<=0 || valor.length<= 0) {
            Alert.alert('Ingrese los datos para continuar')
        }
        else
        {
            Alert.alert('Cargando...')
            addcompra(this.state.idProveedor, this.state.idMaterial, this.state.peso, this.state.usuarioComprador, this.state.valorCompra).then((responseJson) => {
                if (responseJson.error == 0){
                    this.cancelPress()
                }
                Alert.alert(responseJson.mensaje)
            }).catch((error) => {
                Alert.alert('Problemas para registrar su compra, intentelo nuevamente')
                //Alert.alert(error)
            })
        }
    }

    onSelectMaterial(value, label) {
        this.setState({ valueMateial: label, idMaterial: value })
        let materiales = this.state.dataSourceMaterial.data.filter(mat => mat.id == value)
        if (materiales.length > 0) {
            this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', id: materiales[0].id, tipo: materiales[0].tipo, })
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
        listmaterial().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSourceMaterial: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los tipo de materiales')
            //Alert.alert(error)
        })
    }

    getlisProveedores() {
        listproveedor().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSourceProveedor: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los proveedores')
        })
    }

    loadCompo(){
        this.getlisMateriales()
        this.getlisProveedores()
    }

    cancelPress() { this.setState({ peso: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Proveedor', valorCompra:'' }) }

    render() {

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

                        
                        <View style={{ width: '80%' }}>
                            <Text style={styles.labelItem}>Material</Text>
                            <Select
                                onSelect={this.onSelectMaterial.bind(this)}
                                defaultText={this.state.valueMateial}
                                style={{ margin: 7, width: '96%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
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
                            
                            <Text style={styles.labelItem}>Proveedor</Text>
                            <Select
                                onSelect={this.onSelectProveedor.bind(this)}
                                defaultText={this.state.valueProveedor}
                                style={{ margin: 7, width: '96%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
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

                            <Text style={styles.labelItem}>Peso Total</Text>
                            <TextInput style={styles.input} placeholder='Peso' keyboardType={'numeric'} value={this.state.peso} onChangeText={(value) => this.setState({ peso: value })} />

                            <Text style={styles.labelItem}>Valor Total</Text>
                            <TextInput style={styles.input} placeholder='Valor total de la compra' keyboardType={'numeric'} value={this.state.valorCompra} onChangeText={(value) => this.setState({ valorCompra: value })} />


                            <View style={styles.viewMaint}>
                                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                    <Text style={styles.botonText}>Registar Compra</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.cancelPress.bind(this)}>
                                    <Text style={styles.botonText}>Cancelar</Text>
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
    labelItem: {
        fontWeight: '700',
    },
});


//AppRegistry.registerComponent('ComprasForm', () => ComprasForm);