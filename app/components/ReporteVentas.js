import * as React from 'react';
import {
    Alert, StyleSheet, ActivityIndicator, Text, View, TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Table from 'react-native-simple-table'
import { listVentasCabeceras } from '../apis/ventasapi';




const columns = [
    {
        title: '#',
        dataIndex: 'id',
        width:50
    },
    {
        title: 'Cliente',
        dataIndex: 'ruc_cliente',
        width: 120
    },
    {
        title: 'Fecha Venta',
        dataIndex: 'fecha_venta',
        width: 160
    },
    {
        title: 'Valor $',
        dataIndex: 'valor_total',
        width: 60
    }
];



export default class ReporteVentas extends React.Component {


    constructor(props) {
        super(props)
        //this.getlisClientes()
        this.state = { dataSource: '', isLoading: true, existeError: false, finicio: '', ffin: '',}
        
    }

    _onPressButton()
    {
        listVentasCabeceras(this.state.finicio, this.state.ffin).then((responseJson) => {
            //let error = (responseJson.error == 0) ? false : true
            this.setState({ isLoading: false, dataSource: responseJson.data })
        }).catch((error) => {
            Alert.alert('Problemas para listar los clientes')
        })
    }

    _onPressButtonCancel() {
        listVentasCabeceras('','').then((responseJson) => {
            //let error = (responseJson.error == 0) ? false : true

            this.setState({ finicio: '', ffin: '', isLoading: false, dataSource: responseJson.data })
        }).catch((error) => {
            Alert.alert('Problemas para listar los clientes')
        })
    }

    componentWillMount() {
        this._onPressButton()

    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Cargando...</Text>
                    <ActivityIndicator />
                </View>
            )
        }
       
        
        return (
            <View style={{ width: '90%', padding: 10, fontSize:8}}>

                <View>
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
                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <Text style={styles.botonText}>Filtrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressButtonCancel.bind(this)}>
                        <Text style={styles.botonText}>Borrar Filtrar</Text>
                    </TouchableOpacity>
                </View>

                {
                    (this.state.dataSource) ? 
                        <Table fontSize={8} height={500} columnWidth={40} columns={columns} dataSource={this.state.dataSource} />
                    :(
                            <View style={{ flex: 1, padding: 20 }}>
                                <Text>No hay datos para la consulta</Text>
                            </View>
                    )
                }
                
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    containerForm: {
        //justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
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
});

