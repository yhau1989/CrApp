import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import {
    Alert, StyleSheet, AsyncStorage, Text, View, TouchableOpacity, 
         TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { listlotetrituracion, editlote } from '../apis/lotesapi';
import { getOdtListTrituracion, saveProcesoTrituracion } from "../apis/odtapi";


export default class ProcesarLoteForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { usuarioLogon: '', id: '', tipo: '', value: 'Seleccione una ODT', dataSource: '', isLoading: true, existeError: false, finicio: '', ffin: '', labelLote: '', labelMaterial: '', labelPeso: '' }
        this._onPressButton = this._onPressButton.bind(this)
    }

    getUserId = async () => {
        let userId = '';
        try {
            userId = await AsyncStorage.getItem('userId') || '';
        } catch (error) {
            console.log(error.message);
        }

        this.setState({ usuarioLogon: userId })
    }

    componentWillMount() {
        this.getlistODT()
        this.getUserId()
    }

   
    onSelect(value, label) {
        this.setState({ value: label, id: value })
        let odt = this.state.dataSource.data.filter(mat => mat.orden_id == value)
        if (odt.length > 0) {
            this.setState({ labelLote: odt[0].orden_id, labelPeso: odt[0].peso_total, labelMaterial: odt[0].tipo_material})
        }
    }


   

    _onPressButton() {
        let idLote = this.state.id
        let fini = this.state.finicio
        let ffin = this.state.ffin

       

        if (idLote.length <= 0 || fini.length <= 0 || ffin.length <= 0) {
            Alert.alert('Ingrese los datos para continuar')
        }
        else if (this.hoy(fini, ffin)) {
            Alert.alert('Las fechas deben estar en un rango valido')
        }
        else {
             let odt = {
                odt:{
                     id: idLote,
                     usuario: this.state.usuarioLogon,
                     fini: fini,
                     ffin: ffin
                }
            }

            saveProcesoTrituracion(odt).then((responseJson) => {
                Alert.alert(responseJson.mensaje)
                this.cancelPress()
            }).catch((error) => {
                Alert.alert('Problemas para listar los Seleccione un lote')
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

    getlistODT() {
       
        getOdtListTrituracion().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSource: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para listar los tipos de materiales')
        })
    }

    newPress() { this.setState({ value: 'Tipos de materiales', colorAccionNew: '#2ecc71', colorAccionEdit: 'grey', accion: 'new', id: '', tipo:''}) }

    editPress() {

        if (this.state.id.length > 0) {
            let materiales = this.state.dataSource.data.filter(mat => mat.id == this.state.id)
            if (materiales.length > 0) {
                this.setState({ colorAccionNew: 'grey', colorAccionEdit: '#2ecc71', accion: 'edit', id: materiales[0].id, tipo: materiales[0].tipo,})
            }
        }
    }

    cancelPress() { 
        this.getlistODT()
        this.setState({ finicio: '', ffin: '', id: '', tipo: '', value: 'Seleccione un lote', labelLote: '', labelMaterial: '', labelPeso: '' }) 
    }


    hoy(fini, ffin) {
        let x = new Date()
        let xday = x.getDate()
        let xmont = x.getMonth()

        let finiDay = parseInt(fini.split(' ')[0].split('-')[2])
        let finiMonth = parseInt(fini.split(' ')[0].split('-')[1])
        let finiYear = parseInt(fini.split(' ')[0].split('-')[0])

        let ffinDay = parseInt(ffin.split(' ')[0].split('-')[2])
        let ffinMonth = parseInt(ffin.split(' ')[0].split('-')[1])
        let ffinYear = parseInt(ffin.split(' ')[0].split('-')[0])


        if (finiYear >= x.getFullYear() && finiMonth >= xmont && finiDay >= xday && finiDay <= ffinDay && finiMonth <= ffinMonth && finiYear <= ffinYear) {
            return false
        }
        else {
            return true
        }
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


                <SafeAreaView style={styles.containerForm}>
                    <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
                        <TouchableWithoutFeedback>

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
                                            width: 275,
                                            margin: 5,
                                            padding: 3,
                                        },
                                        dateInput: {
                                            borderColor: 'grey',
                                            borderRadius: 5,
                                            width: 275,
                                        },
                                        placeholderText: {
                                            width: 275,
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
                                            width: 275,
                                            margin: 5,
                                            padding: 3,
                                        },
                                        dateInput: {
                                            borderColor: 'grey',
                                            borderRadius: 5,
                                            width: 275,
                                        },
                                        placeholderText: {
                                            width: 275,
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

                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>

                </SafeAreaView>



            );


        }

        
    }
}


const styles = StyleSheet.create({
    containerForm: {
        alignItems: 'center',
        flex: 1,
        color: '#323232',
        width: '100%',
        paddingVertical: 10,
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


//AppRegistry.registerComponent('ProcesarLoteForm', () => ProcesarLoteForm);