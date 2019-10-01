import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, TextInput, Text, Picker, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addproveedor, listproveedorMant, editproveedor } from '../apis/proveedorapi';

export default class MantProveedoresForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            colorAccionNew: '#2ecc71', colorAccionEdit: 'grey', accion: 'new', id: '', ruc: '', nombre: '', apellido: '', direccion: '', email: '', 
            telefono: '', value: 'Lista de Proveedores', dataSource: '', isLoading: true, existeError: false, estado_proveedor:'1' ,
            showActivo: false
        }
        this._onPressButton = this._onPressButton.bind(this)
    }

    componentWillMount() { this.getlisProveedores() }

    onSelect(value, label) { 
        this.setState({ value: label, id: value })
        let provee = this.state.dataSource.data.filter(prov => prov.id == value)
        if (provee.length > 0) {
            
            this.setState({
                colorAccionNew: 'grey', colorAccionEdit: '#2ecc71', showActivo: true, accion: 'edit',
            id: provee[0].id, ruc: provee[0].ruc, nombre: provee[0].nombres, apellido: provee[0].apellidos, 
                direccion: provee[0].direccion, email: provee[0].email, telefono: provee[0].telefono, estado_proveedor: provee[0].estado })
        }
       
    }

    _onPressButton() {
        let ruc = this.state.ruc
        let nombre = this.state.nombre
        let apellido = this.state.apellido
        let direccion = this.state.direccion
        let telefono = this.state.telefono

        if (ruc.length <= 0 || nombre.length <= 0 || apellido.length <= 0 || direccion.length <= 0 || telefono.length <= 0) {
            Alert.alert('Ingrese los datos para continuar')
        }
        else {
            Alert.alert('Cargando...')
            if(this.state.accion == 'new')
            {
                Alert.alert('addproveedor')
                addproveedor(ruc, nombre, apellido, direccion, telefono, this.state.estado_proveedor).then((responseJson) => {
                    let error = (responseJson.error == 0) ? false : true
                    this.setState({ existeError: error})
                    this.cancelPress()
                    Alert.alert(responseJson.mensaje)
                }).catch((error) => {
                    Alert.alert('existen problemas de conexión')
                })
            }
            else if (this.state.accion == 'edit')
            {
                if (ruc.length <= 0 || nombre.length <= 0 || apellido.length <= 0 || direccion.length <= 0 || telefono.length <= 0) {
                    Alert.alert('Ingrese los datos para continuar')
                }
                else{
                    editproveedor(this.state.id, ruc, nombre, apellido, direccion, telefono, this.state.estado_proveedor).then((responseJson) => {
                        let error = (responseJson.error == 0) ? false : true
                        this.setState({ existeError: error, })
                        this.cancelPress()
                        Alert.alert(responseJson.mensaje)
                    }).catch((error) => {
                        Alert.alert('existen problemas de conexión')
                    })
                }
            }
        }
    }


    validateList = (obj) => {
        let lista = { error: 0, mensaje: null, data: null}
        return (obj.data && obj.data.length > 0) ? obj : lista
    }

    getlisProveedores() 
    {
       
        listproveedorMant().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            
                this.setState({ existeError: error, isLoading: false, dataSource: this.validateList(responseJson) })
            

        }).catch((error) => {
            Alert.alert('Problemas para listar los proveedores' )
        })
    }

    newPress() { this.setState({ value: 'Lista de Proveedores', colorAccionNew: '#2ecc71', showActivo: false, colorAccionEdit: 'grey', accion: 'new', idClient: '', ruc: '', nombre: '', apellido: '', direccion: '', email: '', telefono: '', estado_proveedor: '1' }) }

    editPress() {

        if (this.state.id.length > 0)
        {
            let provee = this.state.dataSource.data.filter(prov => prov.id == this.state.id)
            if (provee.length > 0) {
                this.setState({ colorAccionNew: 'grey', colorAccionEdit: '#2ecc71', accion: 'edit', id: provee[0].id, ruc: provee[0].ruc, nombre: provee[0].nombres, apellido: provee[0].apellidos, direccion: provee[0].direccion, email: provee[0].email, telefono: provee[0].telefono })
            }    
        }
    }

    cancelPress() { 
        this.getlisProveedores()
        this.setState({
                        colorAccionNew: '#2ecc71', colorAccionEdit: 'grey', 
                        accion: 'new', id: '', ruc: '', nombre: '', apellido: '', direccion: '', 
                        email: '', telefono: '', value: 'Lista de Proveedores', estado_proveedor: '1', showActivo: false
                    }) 
    }



    render() {

        
        if (this.state.isLoading && this.state.existeError === false) {
            return (
                <View style={styles.containerForm}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        return (


            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.footer}>
                    <View style={styles.boxlateral}>
                        <Text style={{ paddingBottom: 10, color: this.state.colorAccionNew }} onPress={this.newPress.bind(this)}>
                            <Ionicons name="ios-person-add" size={20} color={this.state.colorAccionNew} />    Nuevo
                            </Text>
                    </View>
                    <View style={styles.boxlateral} >
                        <Text style={{ paddingBottom: 10, color: this.state.colorAccionEdit }} onPress={this.editPress.bind(this)}>
                            <Ionicons name="md-create" size={20} color={this.state.colorAccionEdit} />    Editar
                            </Text>
                    </View>
                    <View style={styles.boxlateral}>
                        <Text style={styles.textLateral} onPress={this.cancelPress.bind(this)}>
                            <Ionicons name="md-close" size={20} color={this.state.colorAccion} />    Cancelar
                            </Text>
                    </View>
                </View>

                 <SafeAreaView>
                    <ScrollView>
                        <View style={{ paddingTop: 10, paddingBottom: 40, paddingHorizontal: 20 }}>
                                    
                                    <Text style={styles.labelItem}>Lista de proveedores</Text>
                                    <Select
                                        onSelect={this.onSelect.bind(this)}
                                        defaultText={this.state.value}
                                        style={{ margin: 7, width: '96%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
                                        textStyle={{}}
                                        backdropStyle={{ backgroundColor: "#F6F8FA", }}
                                        optionListStyle={{ backgroundColor: "#ffffff", width: '80%', height: '60%', }}>
                                        {
                                            this.state.dataSource.data ? (
                                                this.state.dataSource.data.map((client) => (
                                                    <Option key={client.id} value={client.id}>{`${client.nombres} ${client.apellidos}`}</Option>
                                                )
                                                )
                                            )
                                                : ('')
                                        }
                                    </Select>

                                    <Text style={styles.labelItem}>Ruc</Text>
                                    <TextInput style={styles.input} maxLength={13} placeholder='Ruc' value={this.state.ruc} onChangeText={(value) => this.setState({ ruc: value })} />
                                    <Text style={styles.labelItem}>Nombres</Text>
                                    <TextInput style={styles.input} placeholder='Nombres' value={this.state.nombre} onChangeText={(value) => this.setState({ nombre: value })} />
                                    <Text style={styles.labelItem}>Apellidos</Text>
                                    <TextInput style={styles.input} placeholder='Apellidos' value={this.state.apellido} onChangeText={(value) => this.setState({ apellido: value })} />
                                    <Text style={styles.labelItem}>Dirección</Text>
                                    <TextInput style={styles.input} placeholder='Dirección' value={this.state.direccion} onChangeText={(value) => this.setState({ direccion: value })} />
                                    <Text style={styles.labelItem}>Teléfono</Text>
                                    <TextInput style={styles.input} maxLength={10} placeholder='Teléfono' value={this.state.telefono} onChangeText={(value) => this.setState({ telefono: value })} />


                                    {this.state.showActivo ? (
                                        <View>
                                            <Text style={styles.labelItem}>Estado</Text>
                                            <View style={styles.input}>
                                                <Picker
                                                    selectedValue={this.state.estado_proveedor}
                                                    style={{ width: '100%' }}
                                                    itemStyle={{ width: '100%' }}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({ estado_proveedor: itemValue })}>
                                                    <Picker.Item label="Activo" value="1" />
                                                    <Picker.Item label="Inactivo" value="2" />
                                                </Picker>
                                            </View>
                                        </View>
                                    ) : null}
                                

                                    <View style={styles.viewMaint}>
                                        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                            <Text style={styles.botonText}>Guardar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                    </ScrollView>
                 </SafeAreaView>
            </KeyboardAvoidingView>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    containerForm: {
        alignItems: 'center',
        color: '#323232',
        width: '100%',
        height: '100%'
    },
    viewMaint: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        margin: 6,
        paddingRight: 5,
        paddingLeft: 5,
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
});



//AppRegistry.registerComponent('MantProveedoresForm', () => MantProveedoresForm);