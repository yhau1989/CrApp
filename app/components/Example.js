import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { List, ListItem, CheckBox } from "react-native-elements";



export default class Example extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            checkedList: [false, false, false, false, false, false, false, false, false,false, false]
        }
    }

    componentWillMount() {
    }


    touch(index)
    {
        let estados = this.state.checkedList
        estados[index] = (estados[index]) ? false : true

        this.setState({ checkedList: estados,   })
    }

    
    render() {
        return (
            <View style={styles.container}>
                <FlatList style={{ height: 300,}}
                    data={[{ key: '0', name: 'Samuel' },
                          { key: '1', name: 'Emanuel' }
                        , { key: '2', name: 'Kiara2', lastname:'Pilay' }
                        , { key: '3', name: 'Kiara3', lastname:'Pilay 2' }
                        , { key: '4', name: 'Kiara4' , lastname:'Pilay 3'}
                        , { key: '5', name: 'Kiara5' , lastname:'Pilay 4'}
                        , { key: '6', name: 'Kiara6' , lastname:'Pilay 5'}
                        , { key: '7', name: 'Kiara7' , lastname:'Pilay 6'}
                        , { key: '8', name: 'Kiara8' , lastname:'Pilay 8'}
                        , { key: '9', name: 'Kiara9' , lastname:'Pilay 200'}
                        , { key: '10', name: 'Kiara10', lastname:'Pilay 150' }
                    ]}
                    renderItem={({ item }) => (
                        
                        <View style={styles.containerHijo}>
                            <View style={styles.containerHijo70}>
                                <Text>{item.name}</Text>
                                <Text>{item.lastname}</Text>
                            </View>
                            <View style={styles.containerHijo30}>
                                <CheckBox
                                    key = {item.key}
                                    center
                                    iconRight
                                    //iconType='material'
                                    checkedIcon='check-square'
                                    //uncheckedIcon='square'
                                    checkedColor='#2ecc71'
                                    checked={this.state.checkedList[item.key]}
                                    onPress={this.touch.bind(this, item.key)}
                                />
                            </View>
                        </View>
                        
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    containerHijo: {
        flex: 1,
        width: '100%',
        height: 100,
        alignItems: 'flex-start', 
        flexDirection: 'row',
        borderBottomWidth: 0.23,
        padding: 5,
    },
    containerHijo70: {
        flex: 1,
        width: '95%',
        height: 100,
    },
    containerHijo30: {
        flex: 1,
        flexDirection: 'row',
        width: '10%',
        height: 100,
        justifyContent: 'flex-end',
    },
});
