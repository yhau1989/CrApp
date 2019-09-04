import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AsyncStorage, Text, View, TouchableOpacity, 
    TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { listlotealmacena, editlote } from '../apis/lotesapi';
import { materialById } from '../apis/materialapi';
import { listmaterial} from '../apis/materialapi';
import { getOdtListAlmacenamiento, saveProcesoAlmacena } from "../apis/odtapi";



export default class ProcesoAlmacenajeLoteForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { usuarioLogon: '', id: '', tipo: '', value: 'Seleccione una ODT', dataSource: '', 
            isLoading: true, existeError: false, finicio: '', ffin: '', labelLote: '', labelMaterial: '', labelPeso: '', 
            dataSourceMaterial: '', valueMaterial: 'Tipos de materiales', idMaterial: '', pesoTriturado:'', }
        this._onPressButton = this._onPressButton.bind(this)
    }

    componentWillMount() {
        this.getlistODT()
        this.getUserId()
        this.getlisMateriales()
    }



    hoy(fini,ffin)
    {
        let x = new Date()
        let xday = x.getDate()
        let xmont = x.getMonth()

        let finiDay = parseInt(fini.split(' ')[0].split('-')[2]) 
        let finiMonth = parseInt(fini.split(' ')[0].split('-')[1]) 
        let finiYear = parseInt(fini.split(' ')[0].split('-')[0]) 

        let ffinDay = parseInt(ffin.split(' ')[0].split('-')[2])
        let ffinMonth = parseInt(ffin.split(' ')[0].split('-')[1])
        let ffinYear = parseInt(ffin.split(' ')[0].split('-')[0]) 


        if (finiYear >= x.getFullYear() && finiMonth >= xmont && finiDay >= xday && finiDay <= ffinDay && finiMonth <= ffinMonth && finiYear <= ffinYear)
        {
            return false
        }
        else
        {
            return true
        }
    }

    getUserId = async () => {
        let userId = '';
        try {
            userId = await AsyncStorage.getItem('userId') || '';
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }

        this.setState({ usuarioLogon: userId })
    }

    
    onSelect(value, label) {
        this.setState({ value: label, id: value })
        let odt = this.state.dataSource.data.filter(mat => mat.orden_id == value)
        if (odt.length > 0) {
            this.setState({ labelLote: odt[0].orden_id, labelPeso: odt[0].peso_total, labelMaterial: odt[0].tipo_material })
        }
    }


    nameMaterial(tipoMaterial) {
        materialById(tipoMaterial).then((responseJson) => {
            if (responseJson.error == 0) {
                this.setState({ labelMaterial: responseJson.data[0].tipo })
            }
            else {
                Alert.alert('Problemas para mostrar información del lote, intente nuevamente')
            }
        }).catch((error) => {
            Alert.alert('Problemas para mostrar información del lote, intente nuevamente')
        })
    }

    _onPressButton() {
        let idLote = this.state.id
        let fini = this.state.finicio
        let ffin = this.state.ffin
        let peso = this.state.pesoTriturado
        let material = this.state.idMaterial

        if (idLote.length <= 0 || fini.length <= 0 || ffin.length <= 0 || peso.length <= 0 || material.length <= 0) {
            Alert.alert('Ingrese datos para continuar')
        } 
        else if (this.hoy(fini, ffin))
        {
            Alert.alert('Las fechas deben estar en un rango valido')
        }
        else if (this.state.labelPeso < peso)
        {
            Alert.alert('Peso triturado no puede ser mayor al peso total de la ODT')
        }
        else {

            let odt = {
                odt:{
                        id: idLote,
                    usuario: this.state.usuarioLogon,
                        fini : fini,
                        ffin: ffin,
                        material: material,
                        peso: peso,
                        faltante: (this.state.labelPeso - peso)
                    }
                }

            saveProcesoAlmacena(odt).then((responseJson) => {
                Alert.alert(responseJson.mensaje)
                this.cancelPress()
            }).catch((error) => {
                Alert.alert('Problemas al grabar la transacción')
            })
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

    getlisLotes() {
        listlotealmacena().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSource: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los Seleccione un lote')
        })
    }

    newPress() { this.setState({ value: 'Seleccione un lote', colorAccionNew: '#2ecc71', colorAccionEdit: 'grey', accion: 'new', id: '', tipo:''}) }

    editPress() {

        if (this.state.id.length > 0) {
            let materiales = this.state.dataSource.data.filter(mat => mat.id == this.state.id)
            if (materiales.length > 0) {
                this.setState({ colorAccionNew: 'grey', colorAccionEdit: '#2ecc71', accion: 'edit', id: materiales[0].id, tipo: materiales[0].tipo,})
            }
        }
    }

    cancelPress() 
    { 
        this.setState({ finicio: '', ffin: '', id: '', tipo: '', value: 'Seleccione una ODT', labelLote: '', labelMaterial: '', labelPeso: '', valueMaterial: 'Tipos de materiales', idMaterial: '', pesoTriturado: ''}) 
        this.getlistODT()
    }

    getlisMateriales() {
        listmaterial().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSourceMaterial: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los tipos de materiales')
        })
    }


    onSelectMaterial(value, label) {
        this.setState({ valueMaterial: label, idMaterial: value })
        let lote = this.state.dataSourceMaterial.data.filter(mat => mat.lote == value)
        if (lote.length > 0) {

            this.setState({ labelLote: lote[0].lote, labelPeso: lote[0].peso })
            this.nameMaterial(lote[0].material)
        }
    }

    getlistODT() {
        getOdtListAlmacenamiento().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSource: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los tipos de materiales')
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
        else
        {

            return (

                <View style={styles.containerForm}>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.labelItem}>ODT</Text>
                                <Select
                                    onSelect={this.onSelect.bind(this)}
                                    defaultText={this.state.value}
                                    style={{ margin: 7, width: '96%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
                                    textStyle={{}}
                                    backdropStyle={{ backgroundColor: "#F6F8FA", }}
                                    optionListStyle={{ backgroundColor: "#ffffff", width: '80%', height: '60%', }}>
                                     {
                                        this.state.dataSource.data ?
                                            (
                                                this.state.dataSource.data.map((odt) => (
                                                    <Option key={odt.orden_id} value={odt.orden_id}>{`ODT: ${odt.orden_id}`}</Option>
                                                ))
                                            )
                                            : ('')
                                    } 
                                </Select>

                                <Text style={styles.labelItem}>ODT: <Text style={styles.textLateral}>{this.state.labelLote}</Text></Text>
                                <Text style={styles.labelItem}>Material: <Text style={styles.textLateral}>{this.state.labelMaterial}</Text></Text>
                                <Text style={styles.labelItem}>Peso: <Text style={styles.textLateral}>{this.state.labelPeso}</Text></Text>

                                <Text style={styles.labelItem}>Material triturado</Text>
                                <Select
                                    onSelect={this.onSelectMaterial.bind(this)}
                                    defaultText={this.state.valueMaterial}
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

                                
                                <Text style={styles.labelItem}>Peso Triturado</Text>
                                <TextInput style={styles.input} placeholder='peso triturado' value={this.state.pesoTriturado} onChangeText={(value) => this.setState({ pesoTriturado: value })} />

                                <Text style={styles.labelItem}>Fecha inicio</Text>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.finicio}
                                    mode="datetime"
                                    placeholder="yyyy-mm-dd hh:mm:ss"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minDate="2019-01-01"
                                    maxDate="2099-06-01"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 6
                                        },
                                        dateTouchBody: {
                                            width: 330,
                                            margin: 5,
                                            padding: 3,
                                        },
                                        dateInput: {
                                            borderColor: 'grey',
                                            borderRadius: 5,
                                            width: 330,
                                        },
                                        placeholderText: {
                                            width: 330,
                                            padding: 50,
                                        },
                                    }}
                                    onDateChange={(date) => { this.setState({ finicio: date }) }}
                                />
                                
                                <Text style={styles.labelItem}>fecha fin</Text>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.ffin}
                                    mode="datetime"
                                    placeholder="yyyy-mm-dd hh:mm:ss"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minDate="2019-01-01"
                                    maxDate="2099-06-01"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 6
                                        },
                                        dateTouchBody: {
                                            width: 330,
                                            margin: 5,
                                            padding: 3,
                                        },
                                        dateInput: {
                                            borderColor: 'grey',
                                            borderRadius: 5,
                                            width: 330,
                                        },
                                        placeholderText: {
                                            width: 330,
                                            padding: 50,
                                        },
                                    }}
                                    onDateChange={(date) => { this.setState({ ffin: date }) }}
                                />
                                

                               

                                <View style={styles.viewMaint}>
                                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                        <Text style={styles.botonText}>Guardar Proceso</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.cancelPress.bind(this)}>
                                        <Text style={styles.botonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                       
                </View>

            );


        }

        
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
    textLateral: {
        color: 'grey',
        //paddingLeft: 20,
        paddingRight: 20,
    },
    labelItem: {
        fontWeight: '700',
    },
});


//AppRegistry.registerComponent('ProcesoAlmacenajeLoteForm', () => ProcesoAlmacenajeLoteForm);