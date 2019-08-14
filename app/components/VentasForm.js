import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AppRegistry, TextInput, Text, View, TouchableOpacity,
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator
} from 'react-native';
import { listmaterial } from '../apis/materialapi';
import { listcliente } from '../apis/clientesapi';
import { addcompra } from '../apis/comprasapi';
import Itemfactura  from './Itemfactura';


export default class VentasForm extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
         this.state = {
            usuarioComprador: '11', precio: '', color: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Cliente', 
             dataSourceMaterial: '', dataSourceProveedor: '', isLoading: true, existeError: false, lista: [], lista2: [], peso:'' }
        this._onPressButton = this._onPressButton.bind(this)
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        let item = {
            idmaterial: this.state.idMaterial,
            descripcion: this.state.color,
            precio: this.state.precio,
            peso: this.state.peso
        }
        listaU.push(item)

        const items = []
        for (const [index, value] of listaU.entries()) {
            items.push(<View key={`viewItem${index}`} style={styles.containerItem}>
                <Text key={`txtMaterial${index}`} style={styles.bold}>Id Material: <Text style={styles.welcomeItem}>{value.idmaterial}</Text></Text>
                <Text key={`txtDescripcion${index}`} style={styles.bold}>Material: <Text style={styles.welcomeItem}>{value.descripcion}</Text></Text>
                <Text key={`txtPeso${index}`} style={styles.bold}>Peso: <Text style={styles.welcomeItem}>{value.peso}</Text></Text>
                <Text key={`txtValor${index}`} style={styles.bold}>Valor:<Text style={styles.welcomeItem}> $ {value.precio}</Text></Text>
                <TouchableOpacity onPress={this.deleteItem.bind(this)}>
                    <Text key={`txtEliminar${index}`} style={styles.botonTextItem}>Eliminar</Text>
                </TouchableOpacity>
            </View>)
        }
        
        this.setState({lista:listaU, lista2:items})
        

    }

    onSelectMaterial(value, label) {
        this.setState({ color: label, valueMateial:label, idMaterial: value })
    }

    onSelectProveedor(value, label) {
            this.setState({ valueProveedor: label, idProveedor: value })

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


    deleteItem()
    {
        
        let listaU = this.state.lista
       
        listaU.splice(0,1)
        const items = []
        for (const [index, value] of listaU.entries()) {
            items.push(<View key={`viewItem${index}`} style={styles.containerItem}>
                <Text key={`txtMaterial${index}`} style={styles.bold}>Id Material: <Text style={styles.welcomeItem}>{value.idmaterial}</Text></Text>
                <Text key={`txtDescripcion${index}`} style={styles.bold}>Material: <Text style={styles.welcomeItem}>{value.descripcion}</Text></Text>
                <Text key={`txtPeso${index}`} style={styles.bold}>Peso: <Text style={styles.welcomeItem}>{value.peso}</Text></Text>
                <Text key={`txtValor${index}`} style={styles.bold}>Valor:<Text style={styles.welcomeItem}> $ {value.precio}</Text></Text>
                <TouchableOpacity onPress={this.deleteItem.bind(this)}>
                    <Text key={`txtEliminar${index}`} style={styles.botonTextItem}>Eliminar</Text>
                </TouchableOpacity>
            </View>)
        }
        this.setState({ lista: listaU, lista2: items })
        

    }

    render() {

        this.loadCompo()
        if (this.state.isLoading && this.state.existeError === false) {
            return (
                <View style={styles.containerForm}>
                    <Text>Cargando...</Text>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
         
                        <View style={{ width: '90%', paddingLeft:20 }}>
                           
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
                                <TouchableOpacity onPress={this.deleteItem.bind(this)}>
                                    <Text style={styles.botonText}>Vender</Text>
                                </TouchableOpacity>
                            </View>
                           

                            <Text style={styles.labelItem}>Items {this.state.lista2.length}</Text>
                             <ScrollView>
                                {this.state.lista2}    
                             </ScrollView>
                            
                        </View>

                   

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
    containerItem: {
        margin: 5,
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.23,


    },
    welcomeItem: {
        fontSize: 14,
        margin: 2,
        color: 'grey',
        fontWeight: '700',
    },
    bold: {
        color: 'black',
        fontWeight: '700',
    },
    botonTextItem: {
        textAlign: 'center',
        backgroundColor: 'black',
        margin: 6,
        padding: 10,
        borderRadius: 5,
        fontWeight: '700',
        width: 120,
        fontSize: 16,
        color: 'red',
    },

});


AppRegistry.registerComponent('VentasForm', () => VentasForm);