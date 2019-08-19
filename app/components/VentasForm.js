import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AppRegistry, TextInput, Text, View, TouchableOpacity,
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator
} from 'react-native';
import { listmaterial } from '../apis/materialapi';
import { listcliente } from '../apis/clientesapi';



export default class VentasForm extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
         this.state = {
            usuarioComprador: '11', precio: '', color: '', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Cliente', 
             dataSourceMaterial: '', dataSourceProveedor: '', isLoading: true, existeError: false, lista: new Set(), lista2: new Set(), peso:'',
             subtotal: 0, iva: 0, neto: 0, tiempos:0}
        this._onPressButton = this._onPressButton.bind(this)
       
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

   
    _onPressButton() {

        if (this.state.idMaterial.length == 0 || this.state.precio.length == 0 || this.state.peso.length == 0 || this.state.color.trim().length == 0) {
            Alert.alert('Ingese valores')
        }
        else
        {
            let listaU = this.state.lista
            let subtotalg = this.state.subtotal
            let iv = 0
            let net = 0
            
            let item = {
                idmaterial: this.state.idMaterial,
                descripcion: this.state.color,
                precio: this.state.precio,
                peso: this.state.peso,
                indice: listaU.size + 1
            }
            listaU.add(item)
    
            let items = new Set()
            for (let [value] of listaU.entries()) {
                let subtotalg2 = subtotalg + parseFloat(value.precio)
                iv = subtotalg2 * 0.12
                net = subtotalg2 + iv

               
                /*subtotalg2 = subtotalg2.toFixed(2)*/
                iv = iv.toFixed(2)
                net = net.toFixed(2)

                items.add(<View key={`viewItem${value.indice}`} style={styles.containerItem}>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        width: '100%',
                        height:'100%',
                    }}>
                        <View style={{
                            width: '70%',
                            height: '100%',
                        }}>
                            <Text key={`txtMaterial${value.indice}`} style={styles.bold}>Id Material: <Text style={styles.welcomeItem}>{value.idmaterial}</Text></Text>
                            <Text key={`txtDescripcion${value.indice}`} style={styles.bold}>Material: <Text style={styles.welcomeItem}>{value.descripcion}</Text></Text>
                            <Text key={`txtPeso${value.indice}`} style={styles.bold}>Peso: <Text style={styles.welcomeItem}>{value.peso}</Text></Text>
                            <Text key={`txtValor${value.indice}`} style={styles.bold}>Valor:<Text style={styles.welcomeItem}> $ {value.precio}</Text></Text>
                        </View>
                        <View style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '30%',
                            height: '100%',
                        }}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={this.deleteItem.bind(this, value.indice)}>
                                <Text  key={`txtEliminar${value.indice}`} style={styles.botonTextItem}>Eliminar</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>)

                this.setState({ subtotal: subtotalg2 })


            }
            this.setState({ lista: listaU, lista2: items, iva: iv, neto: net })
            this.cancelPress()
        }
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

    cancelPress() { this.setState({ peso: '', precio:'', color:'', usuarioVendedor: '', idMaterial: '', valueMateial: 'Seleccione Material', idProveedor: '', valueProveedor: 'Seleccione Proveedor', valorCompra: '' }) }


    deleteItem(indic)
    {
        let listaU = this.state.lista
        let elimin = 0
        let iv = 0
        let net = 0

        for (let [value2] of listaU.entries()) {
            if (value2.indice === indic) {
                elimin = value2
                break
            }
        }

        listaU.delete(elimin)


        let subtotalg2 = 0
        let items = new Set()
        for (let [value] of listaU.entries()) {
            subtotalg2 = subtotalg2 + parseFloat(value.precio)
            iv = subtotalg2 * 0.12
            net = subtotalg2 + iv

            //subtotalg2 = subtotalg2.toFixed(2)
            iv = iv.toFixed(2)
            net = net.toFixed(2)


            items.add(<View key={`viewItem${value.indice}`} style={styles.containerItem}>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                }}>
                    <View style={{
                        width: '70%',
                        height: '100%',
                    }}>
                        <Text key={`txtMaterial${value.indice}`} style={styles.bold}>Id Material: <Text style={styles.welcomeItem}>{value.idmaterial}</Text></Text>
                        <Text key={`txtDescripcion${value.indice}`} style={styles.bold}>Material: <Text style={styles.welcomeItem}>{value.descripcion}</Text></Text>
                        <Text key={`txtPeso${value.indice}`} style={styles.bold}>Peso: <Text style={styles.welcomeItem}>{value.peso}</Text></Text>
                        <Text key={`txtValor${value.indice}`} style={styles.bold}>Valor:<Text style={styles.welcomeItem}> $ {value.precio}</Text></Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30%',
                        height: '100%',
                    }}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.deleteItem.bind(this, value.indice)}>
                            <Text key={`txtEliminar${value.indice}`} style={styles.botonTextItem}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>)
        }

        //alert('fin de for eliminacion')
       
        this.setState({ lista: listaU, lista2: items, subtotal: subtotalg2, items, iva: iv, neto: net })
        
    }

    calTotales(precio, operacion, subtotalg)
    {
        let subt = parseFloat(subtotalg)
        let iv = 0
        let net = 0 

        let totales = {
            subtotal : 0,
            iva0 : 0, 
            totalNeto : 0
        }

        switch (operacion) {
            case 'suma':
                    subt = (subt + parseFloat(precio))
                    iv = subt * 0.12
                    net = subt + iv
                    iv = iv.toFixed(2)
                    net = net.toFixed(2)
                    totales = {subtotal : subt, iva : iv, totalNeto : net}

                break;
        
            case 'resta':
                    subt = (subt - parseFloat(precio))
                    iv = subt * 0.12
                    net = subt + iv
                    iv = iv.toFixed(2)
                    net = net.toFixed(2)
                    totales = { subtotal: subt, iva: iv, totalNeto: net }
                break;
        }
        return totales
        
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

            <SafeAreaView style={styles.containerForm}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                    <TouchableWithoutFeedback>
                        
                    
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
                                alignItems: 'center', }}>

                                <View View={{ width: 300, }}>
                                    <Text style={styles.labelItem}>Precio</Text>
                                    <TextInput style={styles.input} width={70} placeholder='$' value={this.state.precio} onChangeText={(value) => this.setState({ precio: value })} /> 
                                </View>
                                <View View={{ width: 300, }}>
                                    <Text style={styles.labelItem}>Peso</Text>
                                    <TextInput style={styles.input} width={60} value={this.state.peso} onChangeText={(value) => this.setState({ peso: value })} />
                                </View>
                                <View View={{ width: 300, }}>       
                                    <Text style={styles.labelItem}>Descripcion (color)</Text>
                                    <TextInput style={styles.input} width={200}  value={this.state.color} onChangeText={(value) => this.setState({ color: value })} />
                                </View>

                            </View>
                            

                            <View style={styles.viewMaint}>
                                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                    <Text style={styles.botonText}>Añadir item</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.cancelPress.bind(this)}>
                                    <Text style={styles.botonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.venderPress.bind(this)}>
                                    <Text style={styles.botonText}>Vender</Text>
                                </TouchableOpacity>
                            </View>
    
                            
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

                <View style={{ width: '90%', paddingLeft: 20 }}>
                    <Text><Text style={styles.labelItem}>Items: </Text>{this.state.lista2.size}</Text>
                    <Text style={{ textAlign: 'left' }}>
                        <Text><Text style={styles.labelItem}>Subtotal: </Text>$ {this.state.subtotal}</Text>
                        <Text><Text style={styles.labelItem}> | Iva: </Text>$ {this.state.iva}</Text>
                        <Text><Text style={styles.labelItem}> | Total neto: </Text>$ {this.state.neto}</Text>
                    </Text>


                    <ScrollView style={{ height: 300, marginTop: 10, borderTopWidth: 0.23, borderTopColor: 'grey' }}>
                        {this.state.lista2}
                    </ScrollView>
                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
       paddingTop: 5,
        color: '#323232',
        width: '100%',
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
        width: 105,
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
        paddingLeft: 5, 
        paddingRight: 5
    },
    containerItem: {
        margin: 5,
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.23,
        height: 100,

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
        margin: 3,
        padding: 5,
        borderRadius: 5,
        fontWeight: '700',
        width: 80,
        fontSize: 14,
        color: 'red',
    },
    buttonStyle: {
        padding: 3,
    }

});


AppRegistry.registerComponent('VentasForm', () => VentasForm);