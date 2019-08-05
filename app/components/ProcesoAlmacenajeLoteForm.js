import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import { Alert, StyleSheet, AppRegistry, TextInput, Text, Picker, View, TouchableOpacity, 
         TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listlotealmacena, editlote } from '../apis/lotesapi';
import { materialById } from '../apis/materialapi';


export default class ProcesoAlmacenajeLoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: '', tipo: '', value: 'Seleccione un lote', dataSource: '', isLoading: true, existeError: false, finicio: '', ffin: '', labelLote: '', labelMaterial: '', labelPeso: '' }
        this._onPressButton = this._onPressButton.bind(this)
    }

    onSelect(value, label) {
        this.setState({ value: label, id: value })
        let materiales = this.state.dataSource.data.filter(mat => mat.id == value)
        if (materiales.length > 0) {
            Alert.alert('Si desea cambiar los datos habilite el control editar')
            this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', id: materiales[0].id, tipo: materiales[0].tipo, })
        }
    }

    onSelect(value, label) {
        this.setState({ value: label, id: value })
        let lote = this.state.dataSource.data.filter(mat => mat.lote == value)
        if (lote.length > 0) {

            this.setState({ labelLote: lote[0].lote, labelPeso: lote[0].peso })
            this.nameMaterial(lote[0].material)
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

    cancelPress() { this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', accion: 'new', id: '', tipo: '', value: 'Seleccione un lote' }) }



    render() {

        this.getlisLotes();
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
                                <Text style={styles.labelItem}>Lotes</Text>
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
                                                this.state.dataSource.data.map((lotes) => (
                                                    <Option key={lotes.lote} value={lotes.lote}>{`Lote: ${lotes.lote}`}</Option>
                                                ))
                                            )
                                            : ('')
                                    } 
                                </Select>

                                <Text style={styles.labelItem}>Lote: <Text style={styles.textLateral}>{this.state.labelLote}</Text></Text>
                                <Text style={styles.labelItem}>Material: <Text style={styles.textLateral}>{this.state.labelMaterial}</Text></Text>
                                <Text style={styles.labelItem}>Peso: <Text style={styles.textLateral}>{this.state.labelPeso}</Text></Text>

                                <Text style={styles.labelItem}>Fecha inicio</Text>
                                <TextInput style={styles.input} placeholder='yyyy-mm-dd hh:mm:ss' value={this.state.finicio} onChangeText={(value) => this.setState({ finicio: value })} />
                                
                                <Text style={styles.labelItem}>fecha fin</Text>
                                <TextInput style={styles.input} placeholder='yyyy-mm-dd hh:mm:ss' value={this.state.ffin} onChangeText={(value) => this.setState({ ffin: value })} />

                               

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
    textLateral: {
        color: 'grey',
        //paddingLeft: 20,
        paddingRight: 20,
    },
    labelItem: {
        fontWeight: '700',
    },
});


AppRegistry.registerComponent('ProcesoAlmacenajeLoteForm', () => ProcesoAlmacenajeLoteForm);