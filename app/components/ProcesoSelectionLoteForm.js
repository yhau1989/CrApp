import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import { Alert, StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import { CheckBox } from "react-native-elements";
import DatePicker from 'react-native-datepicker'
import { listloteselection, lotebyId  } from '../apis/lotesapi';
import { materialById, listmaterial} from '../apis/materialapi';
import { saveOdt} from '../apis/odtapi';


export default class ProcesoSelectionLoteForm extends React.Component {
     

    constructor(props) {
        super(props)
        this.state = {
            usuarioLogon: '',id: '', idMaterial:'', tipo: '', value: 'Seleccione un lote', dataSource: '', 
        isLoading: true, existeError: false, finicio: '', ffin: '', labelLote:'', labelMaterial:'', labelPeso:''  
            , dataSourceMateriales: '', valueMaterial: 'Seleccione material',
            checkedList: [], dataFlat:[], pesoTotal: 0, lotesODT:[]
    
        }
        this._onPressButton = this._onPressButton.bind(this)
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

    componentWillMount()
    {
        this.loadMaterials()
        this.getlisLotes()
        this.getUserId()
    }


    loadMaterials()
    {
        listmaterial().then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            this.setState({ existeError: error, isLoading: false, dataSourceMateriales: this.validateList(responseJson) })
        }).catch((error) => {
            Alert.alert('Problemas para mostrar información del materiales, intente nuevamente')
        })
    }


    getlotesbyId(idMaterial)
    {
        lotebyId(idMaterial).then((responseJson) => {
            let error = (responseJson.error == 0) ? false : true
            let flt = this.armarDataForFlat(this.validateList(responseJson).data)
            this.setState({ existeError: error, isLoading: false, dataSource: this.validateList(responseJson), 
                dataFlat: flt.flat, 'checkedList': flt.checks, pesoTotal: 0, lotesODT: [] })
        }).catch((error) => {
            Alert.alert('Problemas para mostrar Lotes de este tipo de material, intente nuevamente')
        })
    }


    armarDataForFlat(lotes)
    {
        let dataflo = [] , lisatChecks = []
        let data = { flat : [], checks: []}

        if (lotes && lotes.length > 0)
        {
            lotes.forEach(element => {
                lisatChecks.push(false);
                dataflo.push({ key: `${lisatChecks.length}`, idLote: element.lote, peso: element.peso })
                
            });
            data.flat = dataflo
            data.checks = lisatChecks
        }
        else
        {
            Alert.alert('No existen Lotes para este tipo de material')
        }
        return data   
    }



    onSelect(value, label) {
        this.setState({ value: label, id: value })
        let lote = this.state.dataSource.data.filter(mat => mat.lote == value)
        if (lote.length > 0) {
            
            this.setState({ labelLote: lote[0].lote, labelPeso: lote[0].peso })
            this.nameMaterial(lote[0].material)
        }
    }

    onSelectMaterial(value, label) {
        this.setState({ valueMaterial: label, idMaterial: value })
        this.getlotesbyId(value)
    }


    nameMaterial(tipoMaterial){
        materialById(tipoMaterial).then((responseJson) => {
            if(responseJson.error == 0)
            {
                this.setState({ labelMaterial: responseJson.data[0].tipo })
            }
            else
            {
                Alert.alert('Problemas para mostrar información del lote, intente nuevamente')    
            }
        }).catch((error) => {
            Alert.alert('Problemas para mostrar información del lote, intente nuevamente')
        })
    }

    _onPressButton() {
        let fini = this.state.finicio
        let ffin = this.state.ffin
        let lotes = this.state.lotesODT
        let peso = this.state.pesoTotal
        let idmaterial = this.state.idMaterial

        if (fini.length <= 0 || ffin.length <= 0 || lotes.length <= 0 || peso <= 0 || idmaterial.length <= 0)
        {
            Alert.alert('Ingrese los datos para continuar')
        }
        else if (this.hoy(fini, ffin)) {
            Alert.alert('Las fechas deben estar en un rango valido')
        }
        else
        {
            let odt = {
                odt: {
                    material: idmaterial,
                    peso:peso,
                    user_selecciona:this.state.usuarioLogon,
                    fecini: fini,
                    fecfin: ffin,
                    lotes: lotes
                }
            }
            saveOdt(odt).then((responseJson) =>{
                Alert.alert(responseJson.mensaje)
                this.cancelPress()
            }).catch((error) => {
                Alert.alert('Problemas para guardar la ODT')
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
        listloteselection().then((responseJson) => {
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

    cancelPress() { this.setState({ finicio: '', ffin: '', id: '', tipo: '', valueMaterial: 'Seleccione material', labelLote: '', labelMaterial: '', labelPeso: '', checkedList: [], dataFlat: [], pesoTotal: 0, lotesODT: []}) }

    touch(index, lote, peso) {
        let pesoTotalOdt = new Number(this.state.pesoTotal)
        let lotes = this.state.lotesODT
        let estados = this.state.checkedList

        if (estados[index])
        {
            estados[index] = false
            pesoTotalOdt = pesoTotalOdt - new Number(peso)
            if (lotes.indexOf(lote) >= 0)
                lotes.splice(lotes.indexOf(lote), 1)

        }
        else
        {
            estados[index] = true
            lotes.push(lote)
            pesoTotalOdt = pesoTotalOdt + new Number(peso)
        }
        this.setState({ checkedList: estados, pesoTotal: pesoTotalOdt, lotesODT: lotes})
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


                <View style={styles.containerForm}>
                            <View style={{ width: '90%' }}>

                                <Text style={styles.labelItem}>Tipo de material</Text>
                                <Select
                                    onSelect={this.onSelectMaterial.bind(this)}
                                    defaultText={this.state.valueMaterial}
                                    style={{ margin: 7, width: '96%', borderRadius: 5, borderColor: 'grey', borderWidth: 1, }}
                                    textStyle={{}}
                                    backdropStyle={{ backgroundColor: "#F6F8FA", }}
                                    optionListStyle={{ backgroundColor: "#ffffff", width: '80%', height: '60%', }}>
                                    {
                                        this.state.dataSourceMateriales.data ?
                                            (
                                                this.state.dataSourceMateriales.data.map((material) => (
                                                    <Option key={material.id} value={material.id}>{`${material.tipo}`}</Option>
                                                ))
                                            )
                                            : ('')
                                    }
                                </Select>


                                <Text style={styles.labelItem}>Lotes</Text>
                        <FlatList style={{ height: 200, marginVertical: 5, backgroundColor:'#F9F9F9', borderRadius:10}}
                                    data={this.state.dataFlat}
                                    renderItem={({ item }) => (

                                        <View style={styles.containerHijo}>
                                            <View style={styles.containerHijo70}>
                                                <Text>
                                                    <Text style={styles.labelItem}>Lote: </Text>
                                                    {item.idLote}
                                                </Text>
                                                <Text>
                                                    {`Peso: ${item.peso} Kg`}
                                                </Text>
                                            </View>
                                            <View style={styles.containerHijo30}>
                                                <CheckBox
                                                    key={item.key}
                                                    center
                                                    iconRight
                                                    //iconType='material'
                                                    checkedIcon='check-square'
                                                    //uncheckedIcon='square'
                                                    checkedColor='#2ecc71'
                                                    checked={this.state.checkedList[item.key]}
                                                    onPress={this.touch.bind(this, item.key, item.idLote, item.peso)}
                                                />
                                            </View>
                                        </View>

                                    )}
                                />

                        <Text style={styles.labelItem}>Peso Total de ODT: <Text style={styles.textLateral}>{`${this.state.pesoTotal} Kg`}</Text></Text>

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
                                        dateTouchBody:{
                                            width:330,
                                            margin: 5,
                                            padding: 3,
                                        },
                                        dateInput: {
                                            borderColor: 'grey',
                                            borderRadius: 5,
                                            width: 330,
                                        },
                                        placeholderText:{
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
        //justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        color: '#323232',
        width: '100%',
        height: '100%',
        paddingTop: 15,
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
    containerHijo: {
        flex: 1,
        width: '100%',
        height: 50,
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 0.23,
        padding: 5,
        
    },
    containerHijo70: {
        flex: 1,
        width: '95%',
        height: 50,
    },
    containerHijo30: {
        flex: 1,
        flexDirection: 'row',
        width: '10%',
        height: 50,
        justifyContent: 'flex-end',
    },
});

