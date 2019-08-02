import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import { Alert, StyleSheet, AppRegistry, TextInput, Text, Picker, View, TouchableOpacity, 
         TouchableWithoutFeedback, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listmaterial, editmaterial, addmaterial} from '../apis/materialapi';


export default class MantMaterialesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { colorAccionNew: 'grey', colorAccionEdit: 'grey', accion: 'new', id: '', tipo: '',value: 'Tipos de materiales', dataSource: '', isLoading: true, existeError: false }
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

    _onPressButton() {
        let tipo = this.state.tipo

        if (tipo.length <= 0 ) {
            Alert.alert('Ingrese los datos para continuar')
        }
        else {

           Alert.alert('Cargando...')

            if (this.state.accion == 'new') {
               
                addmaterial(tipo).then((responseJson) => {
                    let error = (responseJson.error == 0) ? false : true
                    this.setState({ existeError: error })
                    Alert.alert(responseJson.mensaje)
                }).catch((error) => {
                    //Alert.alert('existen problemas de conexión')
                    Alert.alert(error)
                })
            }
            else if (this.state.accion == 'edit') {
                if (tipo.length <= 0) {
                    Alert.alert('Ingrese los datos para continuar')
                }
                else {
                       editmaterial(this.state.id, tipo).then((responseJson) => {
                        let error = (responseJson.error == 0) ? false : true
                        this.setState({ existeError: error, })
                        Alert.alert(responseJson.mensaje)
                    }).catch((error) => {
                        //Alert.alert('existen problemas de conexión')
                        Alert.alert(error)
                    })
                }
            }
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

    cancelPress() { this.setState({ colorAccionNew: 'grey', colorAccionEdit: 'grey', accion: 'new', id: '', tipo: '', value: 'Tipos de materiales' }) }



    render() {

        this.getlisMateriales();
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
                                                this.state.dataSource.data.map((material) => (
                                                    <Option key={material.id} value={material.id}>{material.tipo}</Option>
                                                ))
                                            )
                                            : ('')
                                    }
                                </Select>

                                <TextInput style={styles.input} placeholder='Tipo' value={this.state.tipo} onChangeText={(value) => this.setState({ tipo: value })} />

                                <View style={styles.input}>
                                    <Picker
                                        selectedValue={this.state.language}
                                        style={{ width: '100%' }}
                                        itemStyle={{ width: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                        <Picker.Item label="Activo" value="1" />
                                        <Picker.Item label="Inactivo" value="2" />
                                    </Picker>
                                </View>

                                <View style={styles.viewMaint}>
                                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                                        <Text style={styles.botonText}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                
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
        backgroundColor:'black'
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


AppRegistry.registerComponent('MantMaterialesForm', () => MantMaterialesForm);