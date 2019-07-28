import * as React from 'react';
import { Select, Option } from "react-native-chooser";
import { Alert, View, StyleSheet, AppRegistry, TextInput, Button, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addcliente, listcliente } from '../apis/clientesapi';


export default class MantClientesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ruc: '', nombre: '', apellido: '', direccion: '', email: '', telefono: '', value: 'Clientes', dataSource: '', isLoading: true,}
        this._onPressButton = this._onPressButton.bind(this);

    }

    onSelect(value, label) {
        this.setState({ value: label });
        Alert.alert(`A seleccionado el id: ${value}`);

    }

    _onPressButton() {
        let email = this.state.email;
        let ruc = this.state.ruc;
        let nombre = this.state.nombre;
        let apellido = this.state.apellido;
        let direccion = this.state.direccion;
        let telefono = this.state.telefono;

        if (email.length <= 0 || ruc.length <= 0 || nombre.length <= 0 || apellido.length <= 0 || direccion.length <= 0 || telefono.length <= 0) {
            
            Alert.alert('Ingrese los datos para continuar');
        }
        else {
            addcliente(ruc, nombre, apellido, direccion, telefono).then((responseJson) => {
                Alert.alert(responseJson.mensaje);
                //getlisClientes();
            }).catch((error) => {
                Alert.alert('existen problemas de conexión');
            });
        }
    }

    getlisClientes()
    {

        listcliente().then((responseJson) => {
           // Alert.alert('Conexion con exito');
            this.setState({
                isLoading: false,
                dataSource: responseJson
            });  
            
        }).catch ((error) => {
            Alert.alert('Problemas para lisar los clientes');
        });
    }

    render() {

        this.getlisClientes();
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text>Cargando...</Text>
                </View>
            );
        }



             return (
                 <View style={styles.containerForm}>



                     <Select
                         onSelect={this.onSelect.bind(this)}
                         defaultText={this.state.value}
                         style={{ margin: 60, padding: 10, width: '80%', }}
                         textStyle={{}}
                         backdropStyle={{ backgroundColor: "#F6F8FA" }}
                         optionListStyle={{ backgroundColor: "#ffffff", width: '80%', }}>

                         {
                             this.state.dataSource.data.map((client) => (
                                 <Option key={client.id} value={client.id}>{`${client.nombres} ${client.apellidos}`}</Option>)
                         )}
                     </Select>

                     <TextInput style={styles.input} placeholder='Ruc' onChangeText={(value) => this.setState({ ruc: value.trim() })} />
                     <TextInput style={styles.input} placeholder='Nombres' onChangeText={(value) => this.setState({ nombre: value.trim() })} />
                     <TextInput style={styles.input} placeholder='Apellidos' onChangeText={(value) => this.setState({ apellido: value.trim() })} />
                     <TextInput style={styles.input} placeholder='Dirección' onChangeText={(value) => this.setState({ direccion: value.trim() })} />
                     <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => this.setState({ email: value.trim() })} />
                     <TextInput style={styles.input} placeholder='teléfono' onChangeText={(value) => this.setState({ telefono: value.trim() })} />

                     <Button buttonStyle={styles.boton} title="Guardar" accessibilityLabel="Guardar"
                         onPress={this._onPressButton.bind(this)}>
                     </Button>



                     <View style={styles.footer}>
                         <View style={styles.boxlateral}>
                             <Text style={styles.textLateral}>
                                 <Ionicons name="ios-person-add" size={20} style={styles.textLateral} />    Nuevo
                            </Text>
                         </View>
                         <View style={styles.boxlateral}>
                             <Text style={styles.textLateral}>
                                 <Ionicons name="md-create" size={20} style={styles.textLateral} />    Editar
                            </Text>
                         </View>
                         <View style={styles.boxlateral}>
                             <Text style={styles.textLateral}>
                                 <Ionicons name="ios-cloud-done" size={20} style={styles.textLateral} />    Guardar
                            </Text>
                         </View>
                     </View>

                 </View>

             );

        

        
    }
}

const styles = StyleSheet.create({
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input:{
        borderColor: 'grey',
        //color: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,

    },
    boton:{
        backgroundColor: 'grey',
        color: 'blue',
        borderWidth: 1,
        margin: 6,
        padding: 10,
        width: '80%',
        borderRadius: 5,
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
        borderColor: 'grey',
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
    },
});


AppRegistry.registerComponent('MantClientesForm', () => MantClientesForm);